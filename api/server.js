const express = require("express");
const cors = require("cors");
const users = require("./services/users.js");
const mongo = require("./database/index.js");

const app = express();
app.use(cors());
app.use(express.json());

mongo.connect();

app.post('/login', users.login)
app.post('/create-account', users.create)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});