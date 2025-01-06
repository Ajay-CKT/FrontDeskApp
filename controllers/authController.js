const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECUREKEY } = require("../utils/config");

const authController = {
  register: async (request, response) => {
    try {
      const { name, email, password, role } = request.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return response
          .status(400)
          .json({ message: "User already registered" });
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();
      response.json({ message: "Registered succussfully!" });
      console.log(request.body);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  login: async (request, response) => {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });
      if (!user)
        return response.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return response.status(404).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, SECUREKEY, {
        expiresIn: "3h",
      });
      response.cookie("token", token, { httpOnle: true });

      response.status(200).json({ message: "Login successful " });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  logout: async (request, response) => {
    try {
      response.clearCookie("token");
      response.status(200).json({ message: "Logout succussful" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  me: async (request, response) => {
    try {
      const userId = request.userId;
      const user = await User.findById(userId).select("-password -__v");
      response.status(200).json({ user });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
