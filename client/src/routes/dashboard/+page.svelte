<script>
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    import Dashboard from "./Dashboard.svelte";

    onMount(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
            goto("/login");
        }
        // Add token to user store
    });

</script>

<Dashboard />
 