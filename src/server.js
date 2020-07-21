require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const db = require("./db.js");
const router = require("./network/routes");
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

db();

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

router(app);
