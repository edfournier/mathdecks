<script>
	import { onMount } from "svelte";
    import { getToken } from "$lib/token.js";
    import { goto } from "$app/navigation";
    import Login from "./Login.svelte";

    onMount(() => {
        const token = getToken();
        if (token) {
            goto("/dashboard");
        }
    });
</script>

<Login />