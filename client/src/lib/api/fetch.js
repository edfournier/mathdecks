import { goto } from "$app/navigation";

export async function fetchWithAuth(url, options = {}) {
    // Add auth header
    if (!options.headers) {
        options.headers = {};
    }
    options.headers["Authorization"] = `Bearer ${JSON.parse(localStorage.getItem("token"))}`

    // Parse and check response
    const res = await fetch(url, options);
    const json = await res.json();
    
    // Redirect to login if token is bad
    if (res.status === 401) {
        console.error(json.error);
        return goto("login");
    }
    if (!res.ok) {
        throw new Error(json.error || "Bad response");
    }
    return json;
}