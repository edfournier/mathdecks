import { goto } from "$app/navigation";

export function getToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
        goto("/login");
    }
    return token;
}

export function saveToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
}

export function wipeToken() {
    localStorage.removeItem("token");
}