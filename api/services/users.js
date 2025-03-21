const db = require("../models");
const User = db.users;

exports.create = (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
  
    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };