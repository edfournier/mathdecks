<script>
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

<div class="card {flipped ? "flipped" : ""}" role="button" tabindex="0" on:keydown={handleKeydown} on:click={flip}>
    <div class="card-content front">
        {card.front}
    </div>
    <div class="card-content back">
        {card.back}
    </div>
</div>
  
<style>
    .card {
        width: 800px;
        height: 400px;
        border-radius: 8px;
        transition: 0.5s;
        transform-style: preserve-3d;
        position: relative;
    }

    .card-content {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        backface-visibility: hidden;
    }
  
    .card.flipped {
        transform: rotateY(180deg);
    }
  
    .front {
        background: rgba(255, 255, 255, 0.8); 
        border: 1px solid #a0c4ff; 
    }
  
    .back {
        background: rgba(240, 250, 255, 0.8);
        transform: rotateY(180deg);
        border: 1px solid #a0c4ff; 
    }
</style>