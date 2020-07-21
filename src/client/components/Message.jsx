import React from "react";

import "./css/Message.css";

const Message = (props) => {
  const { message, modal } = props;
  const setBackground = () => {
    if (message === "Task Deleted!") {
      return "#e64848";
    }
    if (message === "Task Saved!") {
      return "#95ca3e";
    }
    if (message === "Task Updated!") {
      return "#404eca";
    }
    if (message === "Unexpected Error") {
      return "#e64848";
    }
  };

  const setColor = () => {
    if (message === "Task Deleted!") {
      return "white";
    }
    if (message === "Task Saved!") {
      return "black";
    }
    if (message === "Task Updated!") {
      return "white";
    }
    if (message === "Error interno") {
      return "red";
    }
    if (message === "Informacion invalida") {
      return "red";
    }
    if (message === "Unexpected Error") {
      return "white";
    }
  };
  const setClassName = () => {
    if (modal) {
      return "Message-modal";
    } else {
      return "Message-text";
    }
  };
  return (
    <>
      <div
        className={setClassName()}
        style={{ background: setBackground(), color: setColor() }}
      >
        {message}
      </div>
    </>
  );
};

export default Message;
