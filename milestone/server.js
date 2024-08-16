import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import recordsRouter from "./routes/records.js";
import eventsRouter from "./routes/events.js";
import logger from "mathdecks-common/logger";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler } from "mathdecks-common/error";
import "dotenv/config";

await mongoose.connect(process.env.MONGODB_URI);
logger.info("Opened MongoDB connection");

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/records", recordsRouter);
app.use("/events", eventsRouter);
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});