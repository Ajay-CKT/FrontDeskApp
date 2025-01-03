require("dotenv").config();

const MONGODBURI = process.env.MONGODBURI;
const PORT = process.env.PORT;

module.exports = { MONGODBURI, PORT };
