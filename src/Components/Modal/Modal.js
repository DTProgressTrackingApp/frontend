import React from "react";

import "./Modal.css";

function Modal(props) {
  return (
    <div
      className="modal"
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <div
        className="modal_content custom-scroll"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close_button" onClick={props.onClose}> Close
        </button>




        {props.children}
      </div>
    </div>
  );
}

export default Modal;


