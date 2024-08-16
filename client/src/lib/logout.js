import { goto } from "$app/navigation";
import deckStore from "$lib/stores/deck.js";
import userStore from "$lib/stores/user.js";
import viewStore from "$lib/stores/view.js";

/**
 * Preforms all clean-up tasks needed on log out and redirects to login
 */
export function logout() {
    // Reset all stores
    deckStore.reset();
    userStore.reset();
    viewStore.reset();

    // Nuke cache
    localStorage.removeItem("token");

    // Send to login
    goto("/login");
}