<script>
    import { fly } from "svelte/transition";
    import DeckEditor from "./DeckEditor.svelte";
    import DeckViewer from "./DeckViewer.svelte";
    import deckStore from "$lib/stores/deckStore.js";
    import { postNewDeck } from "$lib/requests.js";

    let changing = false;
    let view = null;
    let activeDeck = {};
    let decks = [];

    deckStore.subscribe(newDecks => decks = newDecks);

    async function changeView(newView, newDeck) {
        if (!changing && (view !== newView || activeDeck.id !== newDeck.id)) {
            changing = true;
            view = newView;
            activeDeck = newDeck;
            // Wait for animation to end
            setTimeout(() => changing = false, 260);
        }
    }

    async function createDeck() {
        try {
            // Hit API, update store, then open the new deck
            const deck = await postNewDeck();
            deckStore.update(decks => [...decks, deck]);
            changeView(DeckEditor, deck);
        }
        catch (err) {
            console.error(err);
        }
    }
</script>

<div class="dashboard">
    <div class="deck-list">
        <ul>
            {#each decks as deck}
                <button 
                    class={`deck-item ${activeDeck.id === deck.id ? "active-deck" : ""}`}
                    on:click={() => changeView(DeckViewer, deck)} 
                >
                    {deck.name || "Untitled"}
                    <button class="edit-button" on:click|stopPropagation={() => changeView(DeckEditor, deck)}>✎</button>
                </button>
            {/each}
        </ul>
        <button class="new-button" on:click={createDeck}>New</button>
    </div>
    {#if !changing}
        <div class="view" transition:fly={{ x: 500, duration: 250 }}>
            <svelte:component this={view} deck={activeDeck}/>
        </div>
    {/if}
</div>

<style>
    .dashboard {
        display: flex;
        width: 100%;
        height: 100vh;
    }

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

    .view {
        flex: 1;
        padding: 10px;
    }

    .edit-button {
        background-color: #4b647a;
        border: none;
        border-radius: 4px;
        padding: 5px 8px;
        font-size: 14px;
        color: white;
        cursor: pointer;
        position: absolute;
        right: 10px;
    }

    .new-button {
        font-family: inherit;
        cursor: pointer;
        width: 100%;
        padding: 4px;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #4b647a;
        background: #4b647a;
        color: white;
        margin-top: 10px;
    }

    .new-button:hover, .edit-button:hover {
        background-color: #8393a1;
    }

    .new-button:active, .edit-button:active {
        transform: scale(0.95);
    }
</style>
