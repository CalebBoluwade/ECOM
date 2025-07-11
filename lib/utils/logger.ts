import winston from "winston";

const { combine, timestamp, printf, colorize, align, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    colorize(),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    // printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
    printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    ),
    json({
      replacer: (key, value) =>
        key.includes("password") ? "**********" : value,
    })
  ),
  transports: [    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/user-controller.log" }),
  ],
});

export default logger;
