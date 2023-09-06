const express = require("express");
const app = express();
const port = 4000;
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const {
  forbiddenErrorHandler,
  notFoundErrorHandler,
} = require("./middleware/errorHandlers");

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"]
  })
);

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});

app.use(express.json());

app.use(forbiddenErrorHandler);
app.use(notFoundErrorHandler);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});