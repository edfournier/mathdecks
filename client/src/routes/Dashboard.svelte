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
        if (view != newView) {
            changing = true;  
            view = newView;
            props = newProps;
            // Wait for animation to end
            setTimeout(async () => changing = false, 250);  
        }
    }

    // TODO: display number of cards and date last updated alongside deck name
    // <svelte:component this={view} {...props} />
</script>

<ul>
    {#each Object.values(decks) as deck}
        <li>{deck.name}</li>
        <button on:click={() => changeView("viewer", { deck })}>View</button>
        <button on:click={() => changeView("editor", { deck })}>Edit</button>
    {/each}
</ul>
{#if !changing && view === "editor"}
    <div transition:fly={{ x: 500, duration: 250 }}>
        <DeckEditor deck={props.deck} />
    </div>
{:else if !changing && view === "viewer"} 
    <div transition:fly={{ x: 500, duration: 250 }}>
        <DeckViewer deck={props.deck} />
    </div>
{/if}