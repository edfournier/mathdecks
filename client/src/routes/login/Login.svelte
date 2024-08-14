<script>
    import { goto } from "$app/navigation";
    import { saveToken } from "$lib/token.js";

    let username = "";
    let password = "";
    let alert = null;
    let loginMode = true; 

    async function login() {
        try {
            // Hit token endpoint with credentials
            const res = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.error);
            } else {
                // Save token and redirect to dashboard
                saveToken(json.token);
                goto("/");
            }
        } catch (err) {
            alert = { error: true, message: err.message };
        }
    }

    async function signup() {
        try {
            // Hit create user endpoint
            const res = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                alert = { error: false, message: "Accounted created! Please login."};
                username = "";
                password = "";
                loginMode = true; 
            } else {
                const json = await res.json();
                throw new Error(json.error);
            }
        } catch (err) {
            alert = { error: true, message: err.message };
        }
    }
</script>

<div class="login-container">
    <h1>Mathdecks</h1>
    {#if alert}
        <p class={alert.error ? "error" : "success"}>{alert.message}</p>
    {/if}
    <form on:submit|preventDefault={loginMode ? login : signup}>
        <input type="text" placeholder="Username" bind:value={username} required />
        <input type="password" placeholder="Password" bind:value={password} required />
        <button class="submit-button" type="submit">{loginMode ? "Login" : "Signup"}</button>
    </form>
    <button class="toggle-button" on:click={() => loginMode = !loginMode}>
        {loginMode ? "Or signup" : "Or login"}
    </button>
</div>

<style>
    .login-container {
        margin: auto;
        max-width: 400px;
        text-align: center;
        padding: 20px;
        border-radius: 8px;
        background: white; 
        border: 1px solid #a0c4ff; 
        position: relative;
        top: 50px;
    }

    h1 {
        font-size: 24px;
        color: #283142;
        margin-bottom: 20px;
    }

    input {
        font-family: inherit;
        width: 90%;
        padding: 12px;
        margin-bottom: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 16px;
    }

    button {
        font-family: inherit;
        background-color: #4b647a;
        border: none;
        border-radius: 4px;
        padding: 12px;
        font-size: 16px;
        color: white;
        cursor: pointer;
        width: 40%;
        margin-bottom: 10px;
    }

    .submit-button:hover {
        background-color: #8393a1;
    }

    .submit-button:active {
        transform: scale(0.99);
    }

    .error {
        color: red;
        font-size: 16px;
    }

    .success {
        color: green;
        font-size: 16px;
    }

    .toggle-button {
        font-size: 14px;
        color: #283142;
        background: none;
        border: none;
        cursor: pointer;
        text-decoration: underline;
        margin: 0px;
        padding: 0px;
    }
</style>