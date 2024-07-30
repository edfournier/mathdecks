import { body } from "express-validator";

export const checkCredentials = [
    body("username", "Missing string 'username' in body").exists().isString(),
    body("password", "Missing string 'password' in body").exists().isString()
];