import { getToken } from "$lib/token.js";

export async function postLogin(username, password) {
    const res = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.error || "Bad response");
    } 
    return json.token;
}

export async function postNewUser(username, password) {
    const res = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Bad response");
    } 
}

export async function getUser() {
    const token = getToken();
    const res = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/users/self`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }); 
    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.error || "Bad response");
    } 
    return json;
}