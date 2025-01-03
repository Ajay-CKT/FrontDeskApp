const app = require("./app");
const mongoose = require("mongoose");
const { MONGODBURI, PORT } = require("./utils/config");

mongoose
  .connect(MONGODBURI)
  .then(() => {
    console.log("Connected to Database...");
    app.listen(PORT, () => console.log(`Server running @ localhost:${PORT}`));
  })
  .catch((error) => console.error("Error connecting to mongoDB...", error));
