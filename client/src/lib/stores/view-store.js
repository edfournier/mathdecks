import { writable } from "svelte/store";

// Stores the current dashboard view and active deck
export const viewStore = writable();

viewStore.reset = () => viewStore.set({ component: null, deck: {} });
viewStore.reset();

export default viewStore;