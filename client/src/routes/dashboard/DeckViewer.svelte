<script>
    import Card from "./Card.svelte";
    export let deck;

    let { cards, name } = deck;
    let slide = "";
    let index = 0;

    // Renders next card
    function next() {
        slide = "next";
        index = (index + 1 + cards.length) % cards.length;
        setTimeout(() => slide = "", 200); 
    }

    // Renders previous card 
    function back() {
        slide = "back";
        index = (index - 1 + cards.length) % cards.length;
        setTimeout(() => slide = "", 200); 
    }
</script>

<div class="viewer-container">
    <h1>{name}</h1>
    <div class="card-container {slide}">
        <Card card={cards[index]} />
    </div>
    <div class="nav">
        <button on:click={back}>←</button>
        {index + 1}/{cards.length}
        <button on:click={next}>→</button>
    </div>
</div>

<style>
    .viewer-container {
        margin: 20px auto;
        text-align: center;
        overflow: hidden;
    }

    h1 {
        font-size: 24px;
        color: #283142;
        margin-bottom: 20px;
    }

    .card-container {
        position: relative;
        width: 100%;
        height: 405px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
    }

    .next {
        transform: translateX(10%);
    }

    .back {
        transform: translateX(-10%);
    }

    .nav {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    button {
        background-color: #4b647a;
        border: none;
        border-radius: 4px;
        padding: 10px;
        font-size: 24px;
        color: white;
        cursor: pointer;
    }

    button:hover {
        background-color: #8393a1;
    }

    button:active {
        transform: scale(0.9);
    }
</style>