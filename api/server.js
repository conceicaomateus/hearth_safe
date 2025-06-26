const express = require("express");
const cors = require("cors");
const users = require("./services/users.js");
const api = require("./services/api.js");
const authenticateToken = require("./middlewares/auth-middleware");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", users.login);
app.post("/users", authenticateToken, users.create);
app.get("/users", authenticateToken, users.load);
app.delete("/users/:id", authenticateToken, users.remove);
app.post("/users/generate-api-key", authenticateToken, api.generateApiKey);
app.post("/predict", api.predict);
app.get("/requests", authenticateToken, api.getAllRequests);
app.get("/requests/stats", authenticateToken, api.getRequestsStats);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
