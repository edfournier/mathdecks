import { goto } from "$app/navigation";
import deckStore from "$lib/stores/deck-store.js";
import userStore from "$lib/stores/user-store.js";
import viewStore from "$lib/stores/view-store.js";

export async function fetchWithAuth(url, options = {}) {
    // Add auth header
    if (!options.headers) {
        options.headers = {};
    }
    options.headers["Authorization"] = `Bearer ${JSON.parse(localStorage.getItem("token"))}`

    // Parse and check response
    const res = await fetch(url, options);
    const json = await res.json();
    
    if (!res.ok) {
        // Redirect to login if token is bad
        if (res.status === 401) {
            console.error(json.error);
            deckStore.reset();
            userStore.reset();
            viewStore.reset();
            localStorage.removeItem("token");
            goto("login");
        }
        throw new Error(json.error || "Bad response");
    }
    return json;
}