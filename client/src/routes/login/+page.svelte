<script>
	import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Login from "./Login.svelte";

    onMount(() => {
        const token = localStorage.getItem("token");
        if (token) {
            goto("/dashboard");
        }
    });
</script>

<Login />