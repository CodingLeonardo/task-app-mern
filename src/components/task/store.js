const Model = require("./model");

function addTask(title, description, created_at) {
  const myTask = new Model(title, description, created_at);
  myTask.save();
}

async function getTasks() {
  return new Promise((resolve, reject) => {
    Model.find(function (err, task) {
      if (err) {
        reject(err);
        return false;
      }
      if (task) {
        resolve(task);
      }
    });
  });
}

async function getTaskById(id) {
  return new Promise((resolve, reject) => {
    Model.findById(id, function (err, task) {
      if (err) {
        reject(err);
        return false;
      }
      if (task) {
        resolve(task);
      }
    });
  });
}

function removeTask(id) {
  return Model.deleteOne({
    _id: id,
  });
}

async function updateTask(id, title, description) {
  const foundTask = await Model.findOne({
    _id: id,
  });

  foundTask.title = title;
  foundTask.description = description;

  const newTask = await foundTask.save();
  return newTask;
}

module.exports = {
  add: addTask,
  list: getTasks,
  getById: getTaskById,
  update: updateTask,
  remove: removeTask,
};
