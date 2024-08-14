import { writable } from "svelte/store";

// Stores the array of decks
export const deckStore = writable([]);

export default deckStore;