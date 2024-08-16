<script>
    import userStore from "$lib/stores/user.js";
    import { logout } from "$lib/logout.js";
    import { getRecord } from "$lib/api/milestone.js";
	import { onMount } from "svelte";
    import { goto } from "$app/navigation";

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
</script>

<header>
    <div class="title">Mathdecks</div>
    <div class="user-display">
        <div class="username" role="button" tabindex="0" on:click={() => goto("/user/account")} on:keydown={() => goto("/user/account")}>{username}</div>
        <div class="record">
            <span>🔥 {record.streak || 1} 📅 {record.tally || 1}</span> 
            <span class="tooltip">Login daily to increase your streak and tally!</span>
        </div>
        <button on:click={logout}>Logout</button>
    </div>
</header>

<style>
    header {
        display: flex;
        background-color: #343442; 
        color: white;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
    }

    .username:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .user-display {
        display: flex;
        align-items: center;
    }

    .record {
        position: relative; 
        margin-right: 25px;
    }

    span {
        margin-left: 16px;
    }

    .record .tooltip {
        visibility: hidden;
        text-align: center;
        position: absolute;
        border-radius: 6px;
        bottom: -80px;
        padding: 8px;
        left: -200px;
        width: 300px;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.5s, visibility 0.5s;
        background-color: lightslategray;
    }

    .record:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }
</style>