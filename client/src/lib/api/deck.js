import { fetchWithAuth } from "./fetch.js";

/**
 * @returns a promise resolving to the user's decks
 */
export async function getDecks() {
    return fetchWithAuth(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/all`);
}

/**
 * Creates an empty deck
 * @returns a promise resolving to the new deck if successful
 */
export async function postNewDeck() {
    return fetchWithAuth(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            name: "", 
            cards: [], 
            public: false 
        })
    });
}


/**
 * Overwrites the contents of a specified deck
 * @param {string} deck - the updated deck
 * @returns a promise resolving to the updated deck if successful
 */
export async function putDeck(deck) {
    return fetchWithAuth(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/${deck.id}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deck)
    });
}

/**
 * Deletes the specified deck
 * @param {string} deck - the deck to delete
 * @returns a promise resolving to a status object
 */
export async function deleteDeck(deck) {
    return fetchWithAuth(`${import.meta.env.VITE_DECK_SERVICE_URL}/decks/${deck.id}`, { method: "DELETE" });
}