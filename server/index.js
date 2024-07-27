const express = require("express");
const path = require("path");
const morgan = require("./src/utils/logger").morganLogger;
const { logger, morganLogger } = require("./src/utils/logger");
const dotenv = require("dotenv");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const employeeRoutes = require("./src/routes/employeeRoutes");
const { errorHandler, notFound } = require("./src/middleware/errorChecker");
const cookieParser = require('cookie-parser');
const connectDB = require("./src/config/dbConfig");
const authRoutes = require("./src/routes/authRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");
const salaryRoutes = require('./src/routes/salaryRoutes');
const cors = require('cors')
const attendanceWeek = require("./src/aggression/weekAttendance")
dotenv.config();

// Connect to MongoDB
connectDB()
  .then(() => {
    logger.info("MongoDB Connected");
  })
  .catch((err) => {
    logger.error(`Error: ${err.message}`);
  });

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.API_VERSION;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true 
};

app.use(cors(corsOptions)); 

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// HTTP request logging
app.use(morgan);

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(morganLogger); // Log HTTP requests using morgan

app.use(cookieParser())

app.get("/", (req, res) => {
  res.send(`
    <h1>API is running</h1>
    <p>Environment: ${process.env.NODE_ENV === "production" ? "production" : "development"} mode</p>
    <p>Server is running on port: ${PORT}</p>
    <p>Requested URL: ${req.url}</p>
    <p>Requested Method: ${req.method}</p>
    <p>Requested Body: ${JSON.stringify(req.body)}</p>
    <p>Requested Host: ${req.get("host")}</p>
    <p>Requested Protocol: ${req.protocol}</p>
    <p>Requested User Agent: ${req.get("user-agent")}</p>
  `);

  logger.info(`Server is running on http://localhost:${PORT}
    Environment: ${process.env.NODE_ENV === "production" ? "production" : "development"} mode
    Requested URL: ${req.url}
    Requested Method: ${req.method}
    Requested Body: ${JSON.stringify(req.body)}
    Requested Host: ${req.get("host")}
    Requested Protocol: ${req.protocol}`);
});

// Routes

app.use("/api/auth",authRoutes);
app.use('/api/attendance', attendanceWeek);
app.use(`/api/${VERSION}/employees`, employeeRoutes);
app.use(`/api/${VERSION}/attendance`, attendanceRoutes);
app.use(`/api/${VERSION}/salaries`, salaryRoutes);



// Error handling middleware 
app.use(errorMiddleware);

//Custom Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
