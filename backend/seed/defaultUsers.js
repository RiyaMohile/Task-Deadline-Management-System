const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createDefaultUsers = async () => {
  const adminEmail = "admin@test.com";
  const internEmail = "intern@test.com";

  const adminExists = await User.findOne({ email: adminEmail });
  const internExists = await User.findOne({ email: internEmail });

  if (!adminExists) {
    const hashed = await bcrypt.hash("Admin@123", 10);
    await User.create({
      name: "Default Admin",
      email: adminEmail,
      password: hashed,
      role: "admin",
    });
    console.log("✅ Default Admin created");
  }

  if (!internExists) {
    const hashed = await bcrypt.hash("Intern@123", 10);
    await User.create({
      name: "Default Intern",
      email: internEmail,
      password: hashed,
      role: "intern",
    });
    console.log("✅ Default Intern created");
  }
};

module.exports = createDefaultUsers;
