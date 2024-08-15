import { fetchWithAuth } from "./fetch.js";

export async function getUser() {
    return fetchWithAuth(`${import.meta.env.VITE_AUTH_SERVICE_URL}/users/self`); 
}

export async function postUser(username, password) {
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
