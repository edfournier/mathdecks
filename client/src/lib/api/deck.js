import { fetchWithAuth } from "./fetch-wrapper";

export async function getDecks() {
    return fetchWithAuth(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/all`);
}

export async function postNewDeck() {
    return fetchWithAuth(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "", cards: []})
    });
}

export async function putDeck(deck) {
    return fetchWithAuth(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/${deck.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(deck)
    });
}

export async function deleteDeck(deck) {
    return fetchWithAuth(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/${deck.id}`, {
        method: "DELETE"
    });
}