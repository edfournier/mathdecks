import { writable } from "svelte/store";

const init = { 
    username: "..." 
};

// Stores object containing user data
export const userStore = writable(init);

userStore.reset = () => userStore.set(init);

export default userStore;