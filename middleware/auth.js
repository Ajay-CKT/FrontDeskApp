const jwt = require("jsonwebtoken");
const { SECUREKEY } = require("../utils/config");

const auth = {
  checkAuth: (request, response, next) => {
    const token = request.cookies.token;
    if (!token) return response.json({ message: "Unauthorized" });

    try {
      const decoded = jwt.verify(token, SECUREKEY);
      request.userId = decoded.id;
      next();
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = auth;
