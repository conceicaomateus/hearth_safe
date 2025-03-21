const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const UserModel = mongoose.model("User", userSchema);

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async create() {
    return await UserModel.create(this);
  }

  static async getByEmailAndPassword(email, password) {
    return await UserModel.findOne({ email: email, password: password });
  }
}

module.exports = User;