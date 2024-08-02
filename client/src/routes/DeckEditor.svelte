<script>
    export let deck;

    let { cards, name } = deck;

    function save() {
        console.log("Saving...");
    }

    function add() {
        cards = [...cards, { front: "", back: "" }];
    }

    function remove(target) {
        cards = cards.filter(card => card !== target);
    }
</script>

<div class="container">
    <h1>Deck Editor</h1>
    <input type="text" bind:value={name} placeholder="Enter a deck name">
    <table>
        <thead>
            <tr>
                <th>Front</th>
                <th>Back</th>
            </tr>
        </thead>
        <tbody>
            {#each cards as card}
                <tr>
                    <td>
                        <div class="textarea-container">
                            <textarea bind:value={card.front}  placeholder="..." />
                        </div>
                    </td>
                    <td>
                        <div class="textarea-container">
                            <textarea bind:value={card.back} placeholder="..." />
                            <button class="delete" on:click={() => remove(card)}>✖</button>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <button on:click={add}>Add</button>
    <button on:click={save}>Save</button>
</div>

<style>
    .container {
        max-width: 1500px;
        margin: 20px auto;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h1 {
        margin-top: 0;
        font-size: 24px;
        color: #333;
    }

    input {
        padding: 6px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 2px;
        font-size: 20px;
        font-family: inherit;
    }

    textarea {
        padding: 12px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
        height: 100px;
    }

    textarea {
        resize: vertical;
        flex: 1;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ddd;
        margin-bottom: 15px;
    }

    th, td {
        background-color: #f4f4f4;
        color: #333;
        border: none;
        padding: 12px;
        text-align: left;
    }

    .textarea-container {
        display: flex;
        align-items: center;
    }


    .delete {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        margin-left: 8px; 
    }

    button {
        background-color: #f4f4f4; 
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 8px 16px;
        font: inherit;
        cursor: pointer;
    }

    button:hover {
        background-color: #f9f9f9; 
    }

    button:active {
        transform: scale(0.9);
    }
</style>