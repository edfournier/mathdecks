<script>
    import { fly } from "svelte/transition";
    import DeckEditor from "./DeckEditor.svelte";
    import DeckViewer from "./DeckViewer.svelte";
    import deckStore from "$lib/deckStore.js";

    let changing = false;
    let view = null;
    let activeDeck = {};
    let decks = [];

    deckStore.subscribe(newDecks => {
        decks = newDecks;
    });

    async function changeView(newView, newDeck) {
        if (!changing && (view !== newView || activeDeck.name !== newDeck.name)) {
            changing = true;
            view = newView;
            activeDeck = newDeck;
            // Wait for animation to end
            setTimeout(() => changing = false, 260);
        }
    }
</script>

<div class="dashboard">
    <div class="deck-list">
        <ul>
            {#each Object.values(decks) as deck}
                <div
                    class={"deck-item " + (activeDeck.name === deck.name ? "active-deck" : "")}
                    on:click={() => changeView(DeckViewer, deck)} 
                    on:keydown={() => changeView(DeckViewer, deck)}
                    aria-label="deck" 
                    role="button"
                    tabindex="0" 
                >
                    <span class="deck-name">{deck.name}</span>
                    <button class="edit-button" on:click|stopPropagation={() => changeView(DeckEditor, deck)}>✎</button>
                </div>
            {/each}
        </ul>
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
        overflow: hidden;
    }

    .deck-list {
        flex: 0 0 250px;
        background-color: #f5f5f5;
        border-right: 1px solid #ddd;
        padding: 10px;
        overflow-y: auto;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .deck-item {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        padding: 5px;
        border-radius: 4px;
        background: white;
        border: 1px solid #d3d3d3;
        font-size: 14px;
        position: relative;
        height: 25px;
    }

    .deck-name {
        flex: 1;
        cursor: pointer;
    }

    .active-deck {
        background: lightblue;
    }

    .view {
        flex: 1;
        padding: 10px;
    }

    button {
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

    button:hover {
        background-color: #8393a1;
    }

    button:active {
        transform: scale(0.9);
    }
</style>