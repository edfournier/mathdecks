import { writable } from "svelte/store";

// Stores object containing user data
export const userStore = writable();

userStore.reset = () => userStore.set({ username: "" });
userStore.reset();

export default userStore;