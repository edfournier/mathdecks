import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    // check db for duplicate user
    // hash password with bcrypt
    // save user/pass to db
});

router.delete("/:username", (req, res) => {
    // delete db user
    // send delete-user to event bus
});

export default router;