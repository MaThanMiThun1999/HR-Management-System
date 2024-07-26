const mongoose = require('mongoose');
const { logger } = require('../utils/logger');
require('dotenv').config();

const connectDB = async () => {
  try {
    const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pro-hr';
    const conn = await mongoose.connect(DB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;