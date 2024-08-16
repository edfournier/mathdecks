<script>
    import deckStore from "$lib/stores/deck-store.js";
    import userStore from "$lib/stores/user-store.js";
    import { onMount } from "svelte";
    import { getUser } from "$lib/api/auth.js";
    import { getDecks } from "$lib/api/deck.js";
    import Header from "./Header.svelte";

    onMount(async () => {
        try {
            // Attempt to load user context, otherwise boot to login
            const user = await getUser();
            userStore.set(user);
            
            const decks = await getDecks();
            deckStore.set(decks);
        }
        catch (err) {
            console.error(`Failed to fetch initial data: ${err}`);
        }
    });
</script>

<Header />
<slot />