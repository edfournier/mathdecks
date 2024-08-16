import logger from "./logger.js";

/**
 * @param map - an object mapping event types to a callback accepting event data
 * @returns a middleware that executes an event's mapped callback when it is recieved
 */
export function eventHandler(map) {
    return async (req, res, next) => {
        try {
            const { type, data } = req.body;
            if (type === undefined || data === undefined) {
                throw new Error("Bad event");
            }
            if (map[type] === undefined) {
                logger.info(`Received unmapped event: ${type}`);
            }
            else {
                await map[type](data);
            }
            res.status(200).json({ message: "OK" });
        }
        catch (err) {
            next(err);
        }
    }
}