import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import keysRouter from "./routes/keys.js";
import usersRouter from "./routes/users.js";
import tokenRouter from "./routes/token.js";
import logger from "mathdecks-common/logger";
import { errorHandler } from "mathdecks-common/error";

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/token", tokenRouter);
app.use("/keys", keysRouter);

app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});