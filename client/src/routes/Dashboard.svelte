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
        if (!changing && !(view === newView && activeDeck.name === newDeck.name)) {
            changing = true;
            view = newView;
            activeDeck = newDeck;
            // Wait for animation to end
            setTimeout(() => changing = false, 260);
        }
    }
</script>

<div class="container">
    <ul>
        {#each Object.values(decks) as deck}
            <li class={activeDeck.name === deck.name ? "active-deck" : ""}>
                <button on:click={() => changeView(DeckViewer, deck)}>{deck.name}</button>
                <button on:click={() => changeView(DeckEditor, deck)}>✎</button>
            </li>
        {/each}
    </ul>
    {#if !changing}
        <div class="view" transition:fly={{ x: 500, duration: 250 }}>
            <svelte:component this={view} deck={activeDeck}/>
        </div>                                                                          
    {/if}
</div>

<style>
    .active-deck {
        background: lightblue;
    }

    .container {
        display: flex;
    }

    li {
        margin-bottom: 10px; 
    }

    .view {
        flex: 1;
    }
</style>