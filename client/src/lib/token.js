export function getToken() {
    return JSON.parse(localStorage.getItem("token"));
}

export function saveToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
}

export function wipeToken() {
    localStorage.removeItem("token");
}