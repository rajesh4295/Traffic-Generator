var winston = require('winston');
var format = winston.format;
require('dotenv').config();
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

const filename = process.env.SERVICE_NAME+"-Running.log";

const colors = {
    "info": "green",
    "warn": "yellow",
    "error": "red"
  }

// winston.addColors(colors);

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: process.env.SERVICE_NAME }),
        timestamp(),
        myFormat
      ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.Console(),
      new winston.transports.File({ filename: filename })
    ]
  });
  module.exports = logger;