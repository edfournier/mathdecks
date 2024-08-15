import { fetchWithAuth } from "./fetch.js";

export async function getRecord() {
    return fetchWithAuth(`${import.meta.env.VITE_MILESTONE_SERVICE_URL}/records/daily`);
}