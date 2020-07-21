import React from "react";

import Button from "./Button.jsx";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";

import "./css/Tasks.css";

const Tasks = (props) => {
  const { tasks, deleteTask, editTask } = props;
  tasks.body = tasks.body || [];

  if (tasks.error) {
    return <Message message={tasks.error} modal={true} />;
  }

  if (!tasks.body.length) {
    return <Loader />;
  }
  if (tasks.body.length) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tasks.body.map((task) => {
              return (
                <tr key={task._id}>
                  <th>{task.title}</th>
                  <th>{task.description}</th>
                  <th>
                    {new Intl.DateTimeFormat("es-VE", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    }).format(new Date(task.created_at))}
                  </th>
                  <th>
                    <Button
                      onClick={() => editTask(task._id)}
                      color="secondary"
                    >
                      Edit
                    </Button>
                    <Button onClick={() => deleteTask(task._id)} color="danger">
                      Delete
                    </Button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
};

export default Tasks;
