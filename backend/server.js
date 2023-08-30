const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Welcome welcome welcome!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});