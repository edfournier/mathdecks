import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({level, timestamp, message, stack}) => {
                    return `[${level}] (${process.pid}): ${message} {${timestamp}}` + (stack ? `\n${stack}` : "");
                })
            ),
        }),
        new winston.transports.File({ 
            filename: "app.log",
            format: winston.format.json()
        })
    ]
});

export default logger;