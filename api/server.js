const express = require("express");
const cors = require("cors");
const db = require("./models");
const users = require("./services/users.js");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect('mongodb://127.0.0.1:27017/hearth_safe', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.post('/login', function (req, res) {
    res.send('Hello World')
})

app.post('/create-account', users.create)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});