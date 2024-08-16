import { body } from "express-validator";

export const bodyHasDeck = [
    body("name", "Missing string 'name' in body").exists().isString(),
    body("public", "Missing boolean 'public' in body").exists().isBoolean(),
    body("cards", "Missing array 'cards' in body").exists().isArray(),
    body("cards.*").custom(card => {
        if (card === null 
            || typeof card !== "object" 
            || Object.keys(card).length !== 2 
            || typeof card["front"] !== "string"
            || typeof card["back"] !== "string"
        ) {
            throw new Error("Bad 'cards' array");
        }
        return true
    })
];