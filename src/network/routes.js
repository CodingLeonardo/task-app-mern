const express = require("express");
const task = require("../components/task/network");

const routes = function (server) {
  server.use("/api/tasks", task);
};

module.exports = routes;
