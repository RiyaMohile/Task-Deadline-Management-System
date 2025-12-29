const mongoose = require("mongoose");
const createDefaultUsers = require("../seed/defaultUsers");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // ✅ CREATE DEFAULT USERS AFTER DB CONNECT
    await createDefaultUsers();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
