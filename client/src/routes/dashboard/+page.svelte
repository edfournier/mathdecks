<script>
	import { onMount } from "svelte";
    import Dashboard from "./Dashboard.svelte";

    onMount(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        // if !token, redirect to login
        // add token and user to user store
    });

</script>

<Dashboard />
