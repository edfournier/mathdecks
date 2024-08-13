<script>
	import Katex from "./Katex.svelte";
    export let card;

    let flipped = false;
  
    function flip() {
        flipped = !flipped;
    }

    function handleKeydown(e) {
        if (e.key === "Enter") {
            flip();
        }
    }
</script>

<div class="card-container {flipped ? "flipped" : ""}" role="button" tabindex="0" on:keydown={handleKeydown} on:click={flip}>
    <div class="card-content front">
        <Katex text={card.front} />
    </div>
    <div class="card-content back">
        <Katex text={card.back} />
    </div>
</div>
  
<style>
    .card-container {
        width: 800px;
        height: 400px;
        border-radius: 8px;
        transition: 0.5s;
        transform-style: preserve-3d;
    }

    .card-content {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        position: absolute;
        backface-visibility: hidden;
        display: flex;
        align-items: center;    
        justify-content: center; 
    }
  
    .card-container.flipped {
        transform: rotateY(180deg);
    }

    .card-container:focus {
        outline: none;
    }
  
    .front {
        background: white; 
        border: 1px solid #a0c4ff; 
    }
  
    .back {
        background: rgba(240, 250, 255, 0.8);
        border: 1px solid #a0c4ff; 
        transform: rotateY(180deg);
    }
</style>