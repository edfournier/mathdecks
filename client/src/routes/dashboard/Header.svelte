<script>
    import deckStore from "$lib/stores/deck-store.js";
    import userStore from "$lib/stores/user-store.js";
    import viewStore from "$lib/stores/view-store.js";
    import { goto } from "$app/navigation";
    import { getRecord } from "$lib/api/milestone.js";
	import { onMount } from "svelte";

    let username = "";
    let record = {};

    userStore.subscribe(user => username = user.username);

    onMount(async () => {
        try {
            record = await getRecord();
        }
        catch (err) {
            console.error(`Failed to fetch user's record: ${err}`);
        }
    });

    function logout() {
        // Reset data and send to login
        localStorage.removeItem("token");
        deckStore.reset();
        userStore.reset();
        viewStore.reset();
        goto("/login");
    }
</script>

<header>
    <div class="title">Mathdecks</div>
    <div class="user-display">
        <div class="username">{username}</div>
        <div class="record">
            🔥 {record.streak || 1} 📅 {record.tally || 1}
            <span class="tooltip">Login daily to increase your streak and tally!</span>
        </div>
        <button on:click={logout}>Logout</button>
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background-color: #343442; 
        color: white;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
    }

    .user-display {
        display: flex;
        align-items: center;
    }

    .record, .username {
        margin-right: 16px;
    }

    .record {
        position: relative; 
    }

    .record .tooltip {
        visibility: hidden;
        width: 300px;
        background-color: lightslategray;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        position: absolute;
        z-index: 1;
        left: -200px;
        bottom: -80px;
        margin-left: 0; 
        opacity: 0;
        transition: opacity 0.3s, visibility 0.3s;
    }

    .record:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }

    button {
        font: inherit;
        font-size: 14px;
        min-width: 80px;
        padding: 8px;
        border: none;
        border-radius: 4px;
        background-color: #4b647a;
        color: white;
        cursor: pointer;
    }

    button:hover {
        background-color: #8393a1;
    }

    button:active {
        transform: scale(0.95);
    }
</style>