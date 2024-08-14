<script>
    import { fly } from "svelte/transition";
    import DeckList from "./DeckList.svelte";
    import deckStore from "$lib/stores/deckStore.js";
    import viewStore from "$lib/stores/viewStore.js";

    let decks = [];
    let view = {};
    let changing = false;

    deckStore.subscribe(newDecks => decks = newDecks);

    viewStore.subscribe(newView => {
        if (!changing && !(view.component === newView.component && view.deck.id === newView.deck.id)) {
            view = newView;
            changing = true;
            // Wait for animation to end
            setTimeout(() => changing = false, 260);
        }
    });
</script>

<div class="dashboard">
    <DeckList {decks} />
    {#if !changing}
        <div class="view" transition:fly={{ x: 500, duration: 250 }}>
            <svelte:component this={view.component} deck={view.deck}/>
        </div>
    {/if}
</div>

<style>
    .dashboard {
        display: flex;
        width: 100%;
        height: 100vh;
    }

    .view {
        flex: 1;
        padding: 10px;
    }
</style>
