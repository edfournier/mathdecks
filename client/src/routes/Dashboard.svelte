<script>
    import { scale } from "svelte/transition";
    import DeckEditor from "./DeckEditor.svelte";
    import DeckViewer from "./DeckViewer.svelte";
    import store from "./store.js";

    let view = null;
    let decks = [];
    let props = {};
    let changing = false;

    store.subscribe(newDecks => {
        decks = newDecks;
    });

    async function changeView(newView, newProps) {
        changing = true;  
        view = newView;
        props = newProps;
        // Wait for animation to end
        setTimeout(async () => changing = false, 100);  
    }
</script>

{#if !view && !changing}
    <ul>
        {#each Object.values(decks) as deck}
            <li>{deck.name}</li>
            <button on:click={() => changeView(DeckViewer, { deck })}>View</button>
            <button on:click={() => changeView(DeckEditor, { deck })}>Edit</button>
        {/each}
    </ul>
{:else if !changing}
    <button on:click={() => changeView(null, {})}>Back</button>
    <div in:scale={{ start: 1.2, duration: 100 }} out:scale={{ start: 0.5, duration: 100 }}>
        <svelte:component this={view} {...props} />
    </div>
{/if}