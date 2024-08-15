import { fetchWithAuth } from "./fetch.js";

/**
 * @returns a promise resolving to the user's data
 */
export async function getUser() {
    return fetchWithAuth(`${import.meta.env.VITE_AUTH_SERVICE_URL}/users/self`); 
}

/**
 * Creates a new user with the given credentials
 * @param {string} username - the new account's name
 * @param {string} password - a plain-text password 
 */
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

/**
 * Fetches an auth token for the given user
 * @param {string} username - the user's username
 * @param {string} password - the user's plain-text password
 * @returns a promise resolving to a token
 */
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
