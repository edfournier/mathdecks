import { writable } from "svelte/store";

// Stores object containing user data
export const userStore = writable({});

export default userStore;