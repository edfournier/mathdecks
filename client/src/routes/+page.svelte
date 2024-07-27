<script>
    import Katex from "./Katex.svelte";
    let value = "";
</script>

<input bind:value type="text"/>
<br/>
<br/>
<Katex math={value}/>
