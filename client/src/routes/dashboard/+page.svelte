<script>
    import { getToken } from "$lib/token.js";
	import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { getUser } from "$lib/requests/auth.js";
    import { getDecks } from "$lib/requests/deck.js";
    import Dashboard from "./Dashboard.svelte";
    import Header from "./Header.svelte";
    import deckStore from "$lib/stores/deckStore.js";
    import userStore from "$lib/stores/userStore.js";

    onMount(async () => {
        try {
            const token = getToken();
            if (!token) {
                goto("/login");
            }

            // Populate user store
            const user = await getUser();
            userStore.set(user);
            
            // Populate deck store
            const decks = await getDecks();
            deckStore.set(decks);
        }
        catch (err) {
            console.error(`Failed to initialize dashboard: ${err}`);
        }
    });
</script>

<Header />
<Dashboard />
 