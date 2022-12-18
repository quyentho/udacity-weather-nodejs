// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const app = express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));
// Setup Server

const port = 3000;
app.listen(port, () => console.log(`server listenning on ${port}`));
app.use(express.static("website"));
app.get("/get", (req, res) => res.send(projectData));
app.post("/post", (req, res) => {
  const data = req.body;
  projectData = {
    temperature: data.temperature,
    date: data.date,
    userResponse: data.userResponse,
  };
  res.send("ok");
});
