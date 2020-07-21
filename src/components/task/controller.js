const store = require("./store");

function addTask(title, description) {
  return new Promise((resolve, reject) => {
    if ((!title, !description)) {
      console.error("[taskController] No hay Titulo o Descripcion");
      reject("Los datos son incorrectos");
      return false;
    }

    const fullTask = {
      title: title,
      description: description,
      created_at: new Date(),
    };

    store.add(fullTask);

    resolve(fullTask);
  });
}

function getTasks() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
}

function getTaskById(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("Los datos son incorrectos");
    }

    resolve(store.getById(id));
  });
}

function updateTask(id, title, description) {
  return new Promise(async (resolve, reject) => {
    console.log(id);
    if (!id || !title || !description) {
      reject("Invalid data");
      return false;
    }

    const result = await store.update(id, title, description);

    resolve(result);
  });
}

function deleteTask(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("Id invalido");
      return false;
    }

    store
      .remove(id)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}

module.exports = {
  addTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
