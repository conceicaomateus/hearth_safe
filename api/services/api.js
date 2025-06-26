const Api = require("../models/api");
const axios = require("axios");
const Requests = require("../models/requests");

const generateApiKey = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send({ message: "User ID is required" });
    return;
  }

  try {
    const entity = await Api.create(req.body.userId);
    res.send(entity);
  } catch (error) {
    res.status(500).send({ message: "Error generating API key", error });
  }
};

const predict = async (req, res) => {
  const start = Date.now();
  let status = "200 OK";

  var apiKey = req.headers["api_key"];

  if (!apiKey || !req.body) {
    status = "404 Not Found";
    await Requests.create({
      date: new Date().toISOString(),
      status,
      duration: 0,
    });
    res.status(400).send({ message: "API key and data are required" });
    return;
  }

  const isValidKey = await Api.findByKey(apiKey);

  if (!isValidKey) {
    status = "404 Not Found";
    await Requests.create({
      date: new Date().toISOString(),
      status,
      duration: 0,
    });
    res.status(403).send({ message: "Invalid API key" });
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/predict",
      {
        ...req.body,
      },
      {
        headers: {
          Origin: "http://localhost:8080",
        },
      }
    );
    const duration = (Date.now() - start) / 1000;
    await Requests.create({
      date: new Date().toISOString(),
      status,
      duration,
    });
    return res.send(response.data);
  } catch (error) {
    status = "404 Not Found";
    const duration = (Date.now() - start) / 1000;
    await Requests.create({
      date: new Date().toISOString(),
      status,
      duration,
    });
    res
      .status(500)
      .send({ message: "Erro ao processar a predição", error: error.message });
  }
};

const getAllRequests = async (req, res) => {
  const requests = await Requests.findAll();
  res.send(requests);
};

const getRequestsStats = async (req, res) => {
  const requests = await Requests.findAll();
  const total = requests.length;
  const success = requests.filter((r) => r.status === "200 OK").length;
  const error = requests.filter((r) => r.status === "404 Not Found").length;
  const avgTime =
    requests.length > 0
      ? requests.reduce((acc, r) => acc + r.duration, 0) / requests.length
      : 0;
  const avgTimeInMs = avgTime * 1000; // Convert to milliseconds
  res.send({ total, success, error, avgTime: avgTimeInMs });
};

module.exports = {
  generateApiKey,
  predict,
  getAllRequests,
  getRequestsStats,
};
