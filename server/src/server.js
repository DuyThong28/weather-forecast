const express = require("express");
const app = express();
const cors = require("cors");
const forcastRoutes = require("./routes/forecastRouter");
const userRoutes = require("./routes/userRouter");
const { connection } = require("./config/connectDB");
const job = require("../src/utils/sendDailyEmail");
//connect to database
connection();

//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/forecast", forcastRoutes);
app.use("/api/v1/user", userRoutes);

// Start the cron job
job.start();

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
