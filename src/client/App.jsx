import React, { useEffect, useState } from "react";

import Message from "./components/Message.jsx";
import Button from "./components/Button.jsx";
import Tasks from "./components/Tasks.jsx";
import Footer from "./components/Footer.jsx";

import "./css/App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [id, setId] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    }
    if (event.target.name === "description") {
      setDescription(event.target.value);
    }
  };

  const addTask = (event) => {
    event.preventDefault();

    if (id) {
      fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            console.log(data.error);
            setError(data.error);
          } else {
            setMessage("Task Updated!");
            setTimeout(() => {
              setMessage("");
            }, 4000);
            setTitle("");
            setDescription("");
            setId("");
            setError("");
            fetchTasks();
          }
        });
    } else {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            console.log(data.error);
            setError(data.error);
          } else {
            setTitle("");
            setDescription("");
            setMessage("Task Saved!");
            setTimeout(() => {
              setMessage("");
            }, 4000);
            setError("");
            fetchTasks();
          }
        });
    }
  };

  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage("Task Deleted!");
        setTimeout(() => {
          setMessage("");
        }, 4000);
        fetchTasks();
      });
  };

  const editTask = (id) => {
    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTitle(data.body.title);
        setDescription(data.body.description);
        setId(data.body._id);
      });
  };

  const fetchTasks = async () => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <div className="App">
        <div className="App-header">
          <h1>Task App (MERN)</h1>
        </div>
        <div className="App-content">
          <div>
            {message && <Message message={message} modal={true} />}
            <div className="App-card">
              <form className="App-form" onSubmit={addTask}>
                <input
                  type="text"
                  placeholder="Task Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Task Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
                <Button color="primary">Send</Button>
                {error && <Message message={error} modal={false} />}
              </form>
            </div>
          </div>
          <div>
            <Tasks tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
