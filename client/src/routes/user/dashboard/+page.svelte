<script>
    import { fly } from "svelte/transition";
    import DeckList from "./DeckList.svelte";
    import viewStore from "$lib/stores/view.js";

    let view = {};
    let changing = false;

    viewStore.subscribe(newView => {
        if (!changing && !(view.component === newView.component && view.deck.id === newView.deck.id)) {
            view = newView;
            changing = true;
            setTimeout(() => changing = false, 260);
        }
    });
</script>

<div class="dashboard">
    <div class="main-content">
        <DeckList />
        {#if !changing}
            <div class="view" transition:fly={{ x: 500, duration: 250 }}>
                <svelte:component this={view.component} deck={view.deck}/>
            </div>
        {/if}
    </div>
</div>

<style>
    .dashboard {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .main-content {
        display: flex;
        flex: 1;
    }

    .view {
        flex: 1;
        overflow: auto;
    }
</style>