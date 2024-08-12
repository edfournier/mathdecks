<script>
    import { fly } from "svelte/transition";
    import DeckEditor from "./DeckEditor.svelte";
    import DeckViewer from "./DeckViewer.svelte";
    import store from "$lib/deckStore.js";

    let view = null;
    let changing = false;
    let decks = [];
    let props = {};

    store.subscribe(newDecks => {
        decks = newDecks;
    });

    async function changeView(newView, newProps) {
        if (view !== newView) {
            changing = true;
            view = newView;
            props = newProps;
            // Wait for animation to end
            setTimeout(() => changing = false, 260);
        }
    }
</script>

<ul>
    {#each Object.values(decks) as deck}
        <li>{deck.name}</li>
        <button on:click={() => changeView(DeckViewer, { deck })}>View</button>
        <button on:click={() => changeView(DeckEditor, { deck })}>Edit</button>
    {/each}
</ul>
{#if !changing}
    <div transition:fly={{ x: 500, duration: 250 }} key={view}>
        <svelte:component this={view} {...props} key={view}/>
    </div>                                                                          
{/if}