<script>
	import { onDestroy } from "svelte";
    import { putDeck, deleteDeck } from "$lib/requests.js";
    import viewStore from "$lib/stores/viewStore.js";
    import deckStore from "$lib/stores/deckStore.js";
    export let deck;

    // Clone otherwise card.front/card.back changes would percolate before saving
    deck = structuredClone(deck);
    let changed = false;
    let timestamp = "";

    if (deck.cards.length === 0) {
        deck.cards.push({ front: "", back: "" });
    }

    async function saveDeck() {
        try {
            if (changed) {
                // Update deck on server and store
                const updated = await putDeck(deck);
                deckStore.update(decks => {
                    const index = decks.findIndex(deck => deck.id === updated.id);
                    decks[index] = updated;
                    return decks;
                });
                changed = false;
            }

            // Timestamp last save attempt
            timestamp = `Last saved at: ${
                new Intl.DateTimeFormat("default", {
                    hour12: true,
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                }).format(new Date())
            }`;
        }
        catch (err) {
            console.error(err);
        }
    }

    async function trashDeck() {
        const ok = confirm("Warning: You are about to delete this deck. This cannot be undone.");
        if (ok) {
            // Remove deck on server and in store
            await deleteDeck(deck);
            deckStore.update(decks => decks.filter(e => e.id !== deck.id));
            viewStore.reset();
        }
    }

    function addCard() {
        deck.cards = [...deck.cards, { front: "", back: "" }];
        changed = true;
    }

    function removeCard(target) {
        deck.cards = deck.cards.filter(card => card !== target);
        changed = true;
    }

    onDestroy(saveDeck);
</script>

<div class="editor">
    <input type="text" bind:value={deck.name} on:input={() => changed = true} placeholder="Deck name" />
    {timestamp}
    <table>
        <thead>
            <tr>
                <th>Front</th>
                <th>Back</th>
                <th class="delete-cell"></th>
            </tr>
        </thead>
        <tbody>
            {#each deck.cards as card}
                <tr>
                    <td>
                        <textarea bind:value={card.front} on:input={() => changed = true}/>
                    </td>
                    <td>
                        <textarea bind:value={card.back} on:input={() => changed = true}/>
                    </td>
                    <td class="delete-cell">
                        <div class="delete-button" role="button" tabindex="0" on:keydown={() => removeCard(card)} on:click={() => removeCard(card)}>✖</div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <button on:click={addCard}>Add</button>
    <button on:click={saveDeck}>Save</button>
    <button on:click={trashDeck}>Trash</button>
</div>

<style>
    .editor {
        width: 90%;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #a0c4ff;
        border-radius: 8px;
        background: white;
    }

    input {
        font-family: inherit;
        font-size: 20px;
        padding: 6px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
    }

    textarea {
        font-family: inherit;
        font-size: 14px;
        width: 95%;
        height: 180px;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }

    table {
        width: 100%;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-collapse: collapse;
        background-color: #f4f4f4;
    }

    th {
        color: #333;
        padding-right: 0px;
        padding-top: 25px;
        padding-bottom: 10px;
        text-align: center;
    }

    td {
        color: #333;
        padding-left: 20px;
        padding-right: 0px;
        padding-bottom: 20px;
        text-align: center;
    }

    .delete-cell {
        width: 50px;
        margin: 0px;
        padding: 0px;
    }

    button {
        font: inherit;
        font-size: 14px;
        min-width: 80px;
        padding: 8px;
        border: none;
        border-radius: 4px;
        background-color: #4b647a;
        color: white;
        cursor: pointer;
    }

    button:hover {
        background-color: #8393a1;
    }

    button:active {
        transform: scale(0.95);
    }

    .delete-button {
        font-size: 20px;
        margin-bottom: 20px;
        cursor: pointer;
    }
</style>