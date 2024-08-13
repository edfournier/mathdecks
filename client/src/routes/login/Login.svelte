<script>
    import { goto } from "$app/navigation";

    let username = "";
    let password = "";
    let alert = "";

    async function login() {
        try {
            // Hit token endpoint with credentials
            const res = await fetch("http://localhost:3000/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                alert = "Login failed. Bad credentials.";
            } 
            else {
                // Save token and redirect to dashboard
                const json = await res.json();
                localStorage.setItem("token", JSON.stringify(json.token));
                goto("/");
            }
        } 
        catch (err) {
            console.error(`Login error: ${err}`);
            alert = "An error occurred. Please try again.";
        }
    }
</script>

<div class="login-container">
    <h1>Mathdecks</h1>
    {#if alert}
        <p>{alert}</p>
    {/if}
    <form on:submit|preventDefault={login}>
        <input placeholder="Username" bind:value={username} required />
        <input type="password" placeholder="Password" bind:value={password} required />
        <button type="submit">Login</button>
    </form>
</div>

<style>
    .login-container {
        margin: 20px auto;
        max-width: 400px;
        text-align: center;
        padding: 20px;
        border-radius: 8px;
        background: white; 
        border: 1px solid #a0c4ff; 
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
    }

    button:hover {
        background-color: #8393a1;
    }

    button:active {
        transform: scale(0.99);
    }

    p {
        color: red;
        font-size: 16px;
    }
</style>