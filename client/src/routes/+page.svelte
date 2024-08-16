<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    // Redirects root to dashboard
    onMount(() => goto("/user/dashboard"));
</script>