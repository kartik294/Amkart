import React from "react";
import ReactDOM from "react-dom";
export const Backdrop = (props) => {
  const handleClick = () => {
    if (props.onClose) {
      props.onClose();
    }
  };
  return <div onClick={handleClick} className="loader-overlay"></div>;
};

const Loader = () => {
  return ReactDOM.createPortal(
    <>
      <Backdrop />
      <div className="loader-overlay">
        <div className="loading-dots">
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
        </div>
      </div>
    </>,
    document.getElementById("Loader-root")
  );
};

export default Loader;
