const mongoose = require("mongoose");

const connect = async () => {
  try {
    console.log("Connecting to MongoDB");
    await mongoose.connect("mongodb://127.0.0.1:27017/hearth_safe");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

module.exports = {
  connect
};