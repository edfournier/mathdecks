import { writable } from "svelte/store";

// Stores the array of decks
export const deckStore = writable();

deckStore.reset = () => deckStore.set([]);
deckStore.reset();

export default deckStore;