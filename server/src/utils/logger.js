const { createLogger, transports, format } = require('winston');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const logDirectory = path.join(__dirname, '../../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const morganFormat = ':date[iso] :method :url :status :response-time ms :res[content-length]' + ' (content-length: :res[content-length] bytes)';
const morganLogger = morgan(morganFormat);

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
    format.errors({ stack: true }), 
    format.json()
  ),
  transports: [
    new transports.File({ 
      filename: path.join(logDirectory, 'error.log'), 
      level: 'error' 
    }),
    new transports.File({ 
      filename: path.join(logDirectory, 'combined.log')
    }),
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
      format.printf(info => info.timestamp +' : '+ info.level +' : '+ info.message)
    )
  }));
}

logger.stream = {
  // @ts-ignore
  write: (message) => {
    logger.info(message.trim()); 
  },
};

module.exports = { logger, morganLogger };

