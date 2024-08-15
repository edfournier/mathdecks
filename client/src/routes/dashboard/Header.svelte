<script>
    import deckStore from "$lib/stores/deck-store.js";
    import userStore from "$lib/stores/user-store.js";
    import viewStore from "$lib/stores/view-store.js";
    import { goto } from "$app/navigation";

    let username = "Eric";

    userStore.subscribe(user => username = user.username);

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

    .username {
        margin-right: 16px;
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