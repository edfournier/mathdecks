<script>
    import DeckEditor from './DeckEditor.svelte';
    import DeckViewer from './DeckViewer.svelte';

    // Need to list decks in store, then add buttons to switch between deck list, editor, and viewer
    // The buttons will exist here above the svelte:component, not inside them! 

    const views = [
        DeckEditor,
        DeckViewer
    ];
    let index = 0;

    // Still pass deck as prop, but editor will update store anytime deck changes, so need 
    // ID for the deck passed
    let props = {
        deck: {
            name: "Quadratic Equations",
            cards: [
                { front: "Front 1", back: "Back 1" },
                { front: "Front 2", back: "Back 2" }
            ]
        }
    }

</script>

<button on:click={() => index  = (index  + 1) % views.length}>Switch</button>
<svelte:component this={views[index ]} {...props} />