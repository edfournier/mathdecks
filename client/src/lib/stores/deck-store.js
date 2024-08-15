import { writable } from "svelte/store";

const init = [];

// Stores the array of decks
export const deckStore = writable(init);

deckStore.reset = () => deckStore.set(init);

export default deckStore;