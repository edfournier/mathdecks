<script>
    import { fly } from "svelte/transition";
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
        setTimeout(async () => changing = false, 150);  
    }

    // TODO: display number of cards and date last updated alongside deck name
</script>

{#if !view && !changing}
    <ul transition:fly={{ x: -100, duration: 150 }}>
        {#each Object.values(decks) as deck}
            <li>{deck.name}</li>
            <button on:click={() => changeView(DeckViewer, { deck })}>View</button>
            <button on:click={() => changeView(DeckEditor, { deck })}>Edit</button>
        {/each}
    </ul>
{:else if !changing}
    <button on:click={() => changeView(null, {})}>Back</button>
    <div transition:fly={{ x: 500, duration: 150 }}>
        <svelte:component this={view} {...props} />
    </div>
{/if}