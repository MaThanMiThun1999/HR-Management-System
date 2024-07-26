const { createLogger, transports, format } = require('winston');
const path = require('path');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../../logs/errorNote.txt'),
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
});

const errorMiddleware = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: err.message });
};

module.exports = errorMiddleware;
