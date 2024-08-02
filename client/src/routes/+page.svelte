<script>
    import Dashboard from "./Dashboard.svelte";
	import Katex from "./Katex.svelte";

    // DeckViewer renders Cards 
    // DeckEditor manipulates the store
    // Dashboard lists all decks, let's you launch deck viewer or editor, remove decks from store
    // Nav holds name, login/logout button, and challenge streak/card
    // +page renders nav and dashboard

    let text = "";

</script>
<input bind:value={text} type="text"/>
<Katex {text} /> 
<Dashboard />
