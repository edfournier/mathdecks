import { writable } from "svelte/store";

// Stores the current dashboard view and active deck
export const store = writable({
    component: null,
    deck: {}
});

export default store;