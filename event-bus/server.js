import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import eventsRouter from "./routes/events.js";
import logger from "mathdecks-common/logger";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/events", eventsRouter);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});