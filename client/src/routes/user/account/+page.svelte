<script>
    import { logout } from "$lib/logout.js";
    import { goto } from "$app/navigation";
    import { deleteUser } from "$lib/api/auth.js";
    import userStore from "$lib/stores/user-store.js";

    let user = {};

    userStore.subscribe(newUser => user = newUser);

    async function deleteAccount() {
        if (confirm("Warning: You are about to delete your account. This cannot be undone")) {
            await deleteUser();
            logout();
        }
    }
</script>

<button class="back-button"on:click={() => goto("/user/dashboard")}>Back to Dashboard</button>
<div class="account-container">
    <h1>Account Info</h1>
    <div class="user-info">
        <p><strong>Name:</strong> {user.username || ""}</p>
        <p><strong>Created:</strong> {new Date(user.created).toLocaleDateString() || ""}</p>
    </div>
    <button class="delete-button" on:click={deleteAccount}>Delete Account</button>
</div>

<style>
    .account-container {
        margin: auto;
        max-width: 400px;
        min-height: 200px;
        padding: 20px;
        border-radius: 8px;
        background: white; 
        border: 1px solid #a0c4ff; 
        position: relative;
        top: 50px;
        text-align: center;
        align-content: center;
    }

    h1 {
        font-size: 24px;
        color: #283142;
        margin-bottom: 20px;
    }

    .user-info {
        text-align: left;
        margin-bottom: 20px;
        font-size: 16px;
        color: #4b647a;
    }

    .back-button {
        margin: 10px;
    }

    .delete-button {
        background-color: darkred;
    }

    .delete-button:hover {
        background-color: red;
    }
</style>