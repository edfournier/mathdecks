<script>
    import { goto } from "$app/navigation";
    import { postLogin, postUser } from "$lib/api/auth.js";
    import { onMount } from "svelte";

    let username = "";
    let password = "";
    let error = "";
    let loginMode = true; 

    async function login() {
        try {
            // Login on server, cache token, then redirect to dashboard
            const token = await postLogin(username, password);
            localStorage.setItem("token", JSON.stringify(token));
            goto("/user/dashboard");
        } 
        catch (err) {
            error = err.message;
        }
    }

    async function signup() {
        try {
            // Create user on server then login with it
            await postUser(username, password);
            await login();
        } 
        catch (err) {
            error = err.message;
        }
    }

    onMount(() => {
        const token = localStorage.getItem("token");
        if (token) {
            goto("/user/dashboard");
        }
    });
</script>

<div class="login-container">
    <h1>Mathdecks</h1>
    {#if error}
        <p class="error">{error}</p>
    {/if}
    <form on:submit|preventDefault={loginMode ? login : signup}>
        <input type="text" placeholder="Username" bind:value={username} required />
        <input type="password" placeholder="Password" bind:value={password} required />
        <button class="submit-button" type="submit">{loginMode ? "Login" : "Sign up"}</button>
    </form>
    <button class="toggle-button" on:click={() => loginMode = !loginMode}>
        {loginMode ? "Or sign up" : "Or login"}
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

    .error {
        color: red;
        font-size: 16px;
    }

    .submit-button {
        min-width: 40%;
    }
    
    .toggle-button {
        color: #283142;
        background: none;
        text-decoration: underline;
        margin: 0px;
        margin-top: 10px;
        padding: 5px;
    }
</style>