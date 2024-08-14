import { body } from "express-validator";

export const bodyHasCredentials = [
    body("username", "Missing string 'username' in body").exists().isString(),
    body("password", "Missing string 'password' in body").exists().isString()
];