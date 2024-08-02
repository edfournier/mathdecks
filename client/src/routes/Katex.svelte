<script>
	import katex from "katex";
	export let text;

    // Matches KaTeX between '$$'
    const regex = /\$\$(.*?)\$\$/g;
</script>

{@html text.replace(regex, (match, math) => 
    katex.renderToString(math, { 
        throwOnError: false, 
        displayMode: false 
    })
)}