import { fetchWithAuth } from "./fetch.js";

/**
 * @returns a promise resolving to the user's record, including login streak and tally
 */
export async function getRecord() {
    return fetchWithAuth(`${import.meta.env.VITE_MILESTONE_SERVICE_URL}/records/daily`);
}