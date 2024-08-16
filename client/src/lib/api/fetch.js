import { logout } from "../logout.js";

/**
 * Fetch wrapper for making authenticated requests with 'token' in local storage
 * @param {string} url - a url to fetch
 * @param options - options for the request
 * @returns a promise resolving to the response
 */
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
        // Reset and redirect to login if token is bad
        if (res.status === 401) {
            console.error(json.error);
            logout();
        }
        throw new Error(json.error || "Bad response");
    }
    return json;
}