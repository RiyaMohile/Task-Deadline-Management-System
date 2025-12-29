const User = require("../models/user");

exports.getInterns = async (req, res) => {
  const interns = await User.find({ role: "intern" }).select("-password");
  res.json(interns);
};
