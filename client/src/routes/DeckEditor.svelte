<script>
	import { onDestroy } from "svelte";
    import store from "./store";
    export let deck;

    // Attempt auto-save every 10 seconds
    const autoSaver = setInterval(save, 10000);
    let changed = false;
    let timestamp = "";

    // Clone otherwise card.front/card.back changes would percolate before saving
    deck = structuredClone(deck);

    async function save() {
        if (changed) {
            // TODO: backend call
            store.update(decks => {
            decks[deck.id] = deck;
                return decks;
            });
            changed = false;
        }
        // Timestamp last save
        const time = new Intl.DateTimeFormat("default", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        }).format(new Date());
        timestamp = `Last saved at: ${time}`;
    }

    function add() {
        deck.cards = [...deck.cards, { front: "", back: "" }];
        changed = true;
    }

    function remove(target) {
        deck.cards = deck.cards.filter(card => card !== target);
        changed = true;
    }

    onDestroy(async () => {
        await save();
        clearInterval(autoSaver);
    });

    // TODO: auto-save toggle, use local storage?
</script>

<div class="container">
    <input class="deck-name" type="text" bind:value={deck.name} on:input={() => changed = true} placeholder="Enter a deck name" />
    {timestamp}
    <table>
        <thead>
            <tr>
                <th>Front</th>
                <th>Back</th>
            </tr>
        </thead>
        <tbody>
            {#each deck.cards as card}
                <tr>
                    <td>
                        <div class="textarea-container">
                            <textarea bind:value={card.front} on:input={() => changed = true}/>
                        </div>
                    </td>
                    <td>
                        <div class="textarea-container">
                            <textarea bind:value={card.back} on:input={() => changed = true}/>
                            <button class="delete-button" on:click={() => remove(card)}>✖</button>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <button class="add-button" on:click={add}>Add</button>
    <button class="save-button" on:click={save}>Save</button>
</div>

<style>
    .deck-name {
        text-align: center;
    }

    .container {
        max-width: 1500px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #a0c4ff; 
        background: white;
        border-radius: 8px;
    }

    .textarea-container {
        display: flex;
        align-items: center;
    }

    input {
        padding: 6px;
        margin-bottom: 15px;
        border: none;
        border-radius: 4px;
        font-size: 20px;
        font-family: inherit;
    }

    textarea {
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
        height: 120px;
        resize: vertical;
        flex: 1;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ddd;
        margin-bottom: 15px;
    }

    th, td {
        background-color: #f4f4f4;
        color: #333;
        border: none;
        padding: 12px;
        text-align: center;
    }
    
    button {
        cursor: pointer;
        padding: 10px;
        font: inherit;
        border: none;
        border-radius: 4px;
    }

    button:active {
        transform: scale(0.9);
    }

    .save-button, .add-button {
        min-width: 65px;
        background-color: #4b647a;
        font-size: 16px;
        color: #ffffff;
    }

    .delete-button {
        background-color: none;
        font-size: 20px;
        margin-left: 8px; 
    }

    .save-button:hover, .add-button:hover {
        background-color: #8393a1;
    }
</style>