const express = require("express");

const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

// Get all Tasks
router.route("/").get(function (req, res) {
  controller
    .getTasks()
    .then((TaskList) => {
      response.success(req, res, TaskList, 200);
    })
    .catch((error) => {
      response.error(req, res, "Unexpected Error", 500, error);
    });
});

// Get Task by id
router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  controller
    .getTaskById(id)
    .then((task) => {
      response.success(req, res, task, 200);
    })
    .catch((error) => {
      response.error(req, res, "Unexpected Error", 500, error);
    });
});

// Add Task
router.route("/").post(function (req, res) {
  const { title, description } = req.body;
  controller
    .addTask(title, description)
    .then((fullTask) => {
      console.log(fullTask);
      response.success(req, res, fullTask, 201);
    })
    .catch((error) => {
      response.error(
        req,
        res,
        "Informacion invalida",
        400,
        "Error en el controlador"
      );
    });
});

// Update Task
router.route("/:id").patch(function (req, res) {
  const { id } = req.params;
  const { title, description } = req.body;
  controller
    .updateTask(id, title, description)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(req, res, "Error interno", 500, error);
    });
});

// Delete Task
router.route("/:id").delete(function (req, res) {
  const { id } = req.params;
  controller
    .deleteTask(id)
    .then(() => {
      response.success(req, res, `Task ${req.params.id} deleted`, 200);
    })
    .catch((e) => {
      response.error(req, res, "Error interno", 500, e);
    });
});

module.exports = router;
