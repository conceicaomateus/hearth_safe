const User = require("../models/user");

const create = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = new User(req.body.email, req.body.password);

  const entity = await user.create();
  res.send(entity);
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const entity = await User.getByEmailAndPassword(req.body.email, req.body.password);

  if (!entity) {
    res.status(404).send({ message: "Not found" });
    return;
  }

  res.send(entity);
}

module.exports = {
  create,
  login
};