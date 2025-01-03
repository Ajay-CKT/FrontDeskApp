const express = require("express");
const mongoose = require("mongoose");
const { MONGODBURI, PORT } = require("./utils/config");

const app = express();

app.get("/", (request, response) => response.json({ message: "Hello World!" }));

mongoose
  .connect(MONGODBURI)
  .then(() => console.log("Connected to Database..."))
  .catch((error) => console.error("Error connecting to mongoDB...", error));

app.listen(PORT, () => console.log(`Server running @ localhost:${PORT}`));
