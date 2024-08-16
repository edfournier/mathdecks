<script>
	import { onDestroy } from "svelte";
    import { putDeck, deleteDeck } from "$lib/api/deck.js";
    import viewStore from "$lib/stores/view.js";
    import deckStore from "$lib/stores/deck.js";
    export let deck;

    // If we don't clone, card.front/card.back changes would percolate before saving
    deck = structuredClone(deck);
    let changed = false;
    let timestamp = "";
    let copyText = "Copy share code";

    if (deck.cards.length === 0) {
        // Load a filler card to make the UI nicer
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
            console.error(`Failed to save deck: ${err}`);
        }
    }

    async function trashDeck() {
        if (confirm("Warning: You are about to delete this deck. This cannot be undone.")) {
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

    async function copyShareCode() {
        navigator.clipboard.writeText(deck.id);
        copyText = "Copied!";
        setInterval(() => copyText = "Copy share code", 5000);
    }

    onDestroy(saveDeck);
</script>

<div class="editor">
    <input type="text" bind:value={deck.name} on:input={() => changed = true} placeholder="Deck name" />
    {timestamp}
    <div class="share-container">
        <div class="checkbox-container">
            <input class="checkbox" type="checkbox" bind:checked={deck.public} on:change={() => changed = true} />
            <span>Public</span>
        </div>
        <span class="share-icon" role="button" tabindex="0" on:click={copyShareCode} on:keydown={copyShareCode}>🔗</span> {copyText}
    </div>
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
        color: #333;
        text-align: center;
    }

    th {
        padding-right: 0px;
        padding-top: 25px;
        padding-bottom: 10px;
    }

    td {
        padding-right: 0px;
        padding-left: 20px;
        padding-bottom: 20px;
    }

    .delete-cell {
        width: 50px;
        margin: 0px;
        padding: 0px;
    }

    .delete-button {
        outline: none;
        font-size: 20px;
        margin-bottom: 20px;
        cursor: pointer;
    }

    .checkbox-container {
        display: flex;
        align-items: center;
        margin-left: 3px;
        margin-bottom: 10px;
    }

    .share-container {
        margin-bottom: 16px;
    }

    .checkbox {
        margin: 0px;
        margin-right: 5px;
        width: 18px;
        height: 18px;
        padding: 0px;
    }

    .share-icon, .checkbox {
        outline: none;
        cursor: pointer;
    }
</style>