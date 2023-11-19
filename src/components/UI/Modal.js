import React from "react"; // Import React
import ReactDOM from "react-dom";

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <button type="close" onClick={onClose}>
        ❌
      </button>
      <div className="content">{children}</div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
