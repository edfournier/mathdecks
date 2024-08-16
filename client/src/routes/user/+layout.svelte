<script>
    import deckStore from "$lib/stores/deck.js";
    import userStore from "$lib/stores/user.js";
    import { onMount } from "svelte";
    import { getUser } from "$lib/api/auth.js";
    import { getDecks } from "$lib/api/deck.js";
    import { goto } from "$app/navigation";
    import Header from "./Header.svelte";

    onMount(async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            console.log(token);
            if (!token) {
                return goto("/login");
            }

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