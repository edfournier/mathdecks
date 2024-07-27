import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import winston from "winston";
import keysRouter from "./routes/keys.js";
import usersRouter from "./routes/users.js";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "app.log" })
    ]
});

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/keys", keysRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});