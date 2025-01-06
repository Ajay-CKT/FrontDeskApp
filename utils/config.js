require("dotenv").config();

const MONGODBURI = process.env.MONGODBURI;
const PORT = process.env.PORT;
const SECUREKEY = process.env.SECUREKEY;

module.exports = { MONGODBURI, PORT, SECUREKEY };
