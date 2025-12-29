const mongoose = require("mongoose");
const createDefaultUsers = require("../seed/defaultUsers");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(res=>{

      console.log("MongoDB Connected");
    })

    await createDefaultUsers();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
