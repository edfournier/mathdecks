<script>
    import { getToken } from "$lib/token.js";
	import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Dashboard from "./Dashboard.svelte";
    import Header from "./Header.svelte";
    import deckStore from "$lib/stores/deckStore.js";
    import userStore from "$lib/stores/userStore.js";

    onMount(async () => {
        const token = getToken();
        if (!token) {
            goto("/login");
        }

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

<Header />
<Dashboard />
 