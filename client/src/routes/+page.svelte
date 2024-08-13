<script>
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";

    // Redirects "/" to "/dashboard"
    onMount(() => {
        goto("/dashboard");
    });
</script>