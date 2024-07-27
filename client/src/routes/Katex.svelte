<script>
	import katex from "katex";
	export let math;
	export let displayMode = false;
</script>

{@html 
    katex.renderToString(math, {
        displayMode: displayMode,
        throwOnError: false
    })
}