<script>
    import { getToken } from "$lib/token.js";
	import { onMount } from "svelte";
    import Dashboard from "./Dashboard.svelte";
    import deckStore from "$lib/stores/deckStore.js";
    import userStore from "$lib/stores/userStore.js";

    onMount(async () => {
        const token = getToken();

        // Populate user store
        let res = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/users/self`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }); 
        const user = await res.json();
        userStore.set(user);
        
        // Populate deck store
        res = await fetch(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/all`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const decks = await res.json();
        deckStore.set(decks);
    });
</script>

<Dashboard />
 