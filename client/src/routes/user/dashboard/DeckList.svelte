<script>
    import { postNewDeck, getDeck } from "$lib/api/deck.js";
    import viewStore from "$lib/stores/view.js";
    import deckStore from "$lib/stores/deck.js";
    import DeckEditor from "./DeckEditor.svelte";
    import DeckViewer from "./DeckViewer.svelte";

    let decks = [];
    let activeDeck = {};
    let shareCode = "";
    let shareError = "";

    deckStore.subscribe(newDecks => decks = newDecks);
    viewStore.subscribe(view => activeDeck = view.deck);

    async function createDeck() {
        try {
            const deck = await postNewDeck();
            deckStore.update(decks => [...decks, deck]);
            // Open the editor with the new deck
            viewStore.set({ component: DeckEditor, deck });
        }
        catch (err) {
            console.error(`Failed to create deck: ${err}`);
        }
    }

    async function viewSharedDeck() {
        try {
            const deck = await getDeck(shareCode);
            viewStore.set({ component: DeckViewer, deck });
            shareError = "";
        }
        catch (err) {
            console.error(`Failed to fetch shared deck: ${err}`);
            if (activeDeck.id === shareCode) {
                viewStore.reset();
            }
            shareError = err.status === 403 ? "Deck is private" : "Issue loading shared deck";
        }
    }
</script>

<div class="deck-list"> 
    <ul>
        {#each decks as deck}
            <button 
                class={`deck-item ${activeDeck.id === deck.id ? "active-deck" : ""}`}
                on:click={() => viewStore.set({ component: DeckViewer, deck })} 
            >
                {deck.name || "Untitled"}
                <button class="edit-button" on:click|stopPropagation={() => viewStore.set({ component: DeckEditor, deck })}>✎</button>
            </button>
        {/each}
    </ul>
    <button class="new-button" on:click={createDeck}>New</button>
    <div class="share-container">
        <input type="text" bind:value={shareCode} placeholder="Or enter a share code" />
        <button class="view-button" on:click={viewSharedDeck}>View</button>
    </div>
    {#if shareError} 
        <span class="share-error">{shareError}</span>
    {/if}
</div>

<style>
    .deck-list {
        width: 300px;
        background-color: #f5f5f5;
        padding: 10px;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    .deck-item {
        all: unset;
        cursor: pointer;
        width: 95%;
        height: 25px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin-bottom: 5px;
        padding: 5px;
        border-radius: 4px;
        border: 1px solid #d3d3d3;
        background: white;
    }
    
    .active-deck {
        background: lightblue;
    }

    .edit-button {
        padding: 5px 4px;
        position: absolute;
        right: 10px;
        min-width: 30px;
    }

    .new-button {
        width: 295px;
        padding: 6px;
        margin-top: 10px;
    }

    .share-container {
        margin-top: 14px;
        display: flex;         
        align-items: center;   
        margin-bottom: 6px; 
    }

    input[type="text"] {
        font-family: inherit;
        font-size: 14px;
        padding: 6px;
        width: 215px;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
    }

    .view-button {
        padding: 6px;
        min-width: 60px;
        margin-left: 5px;
    }

    .share-error {
        color: red;
    }
</style>