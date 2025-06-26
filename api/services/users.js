const User = require("../models/user");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const hasEmail = await User.hasEmail(req.body.email);

  if (hasEmail) {
    res.status(400).send({ message: "Email already exists!" });
    return;
  }

  const user = new User(req.body.name, req.body.email, req.body.password);

  const entity = await user.create();
  res.send(entity);
};

const login = async (req, res) => {
  console.log("Login attempt with:", req.body);

  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const entity = await User.getByEmailAndPassword(
    req.body.email,
    req.body.password
  );

  if (!entity) {
    res.status(404).send({ message: "Not found" });
    return;
  }

  const token = jwt.sign(
    { userId: entity.id, email: entity.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return res.json({ token });
};

const load = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({ message: "User ID is required" });
    return;
  }

  try {
    const result = await User.remove(id);
    if (!result) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error });
  }
};

module.exports = {
  load,
  create,
  remove,
  login,
};
