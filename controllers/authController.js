const User = require("../models/User");

const authController = {
  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return response
          .status(400)
          .json({ message: "User already registered" });
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      response.json({ message: "Registered succussfully!" });
      console.log(request.body);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
