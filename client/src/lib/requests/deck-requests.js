import { getToken } from "$lib/token.js";

export async function postNewDeck() {
    const token = getToken();
    const res = await fetch(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: "", cards: []})
    });
    const json = await res.json();
    if (!res.ok) {
        throw new Error(`${json.error || "Bad response"}`);
    }
    return json;
}

export async function putDeck(deck) {
    const token = getToken();
    const res = await fetch(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/${deck.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(deck)
    });
    const json = await res.json();
    if (!res.ok) {
        throw new Error(`${json.error || "Bad response"}`);
    }
    return json;
}

export async function deleteDeck(deck) {
    const token = getToken();
    const res = await fetch(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/${deck.id}`, {
        method: "DELETE", 
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) {
        const json = await res.json();
        throw new Error(`${json.error || "Bad response"}`);
    }
}

export async function getDecks() {
    const token = getToken();
    const res = await fetch(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/all`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const json = await res.json();
    if (!res.ok) {
        throw new Error(`${json.error || "Bad response"}`);
    }
    return json;
}