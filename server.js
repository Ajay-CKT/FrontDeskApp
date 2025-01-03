const express = require("express");

const app = express();

app.get("/", (request, response) => response.json({ message: "Hello World!" }));

app.listen(3001, () => console.log("Server running @ localhost:3001"));
