import { writable } from "svelte/store";

const init = {
    component: null,
    deck: {}
}

// Stores the current dashboard view and active deck
export const viewStore = writable(init);

viewStore.reset = () => {
    viewStore.set(init);
}

export default viewStore;