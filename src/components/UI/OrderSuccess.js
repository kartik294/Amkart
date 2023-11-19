import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import OrderSuccessImage from "../../assets/icons/order_success.svg";

const OrderSuccessModal = ({ onClose, orderId }) => {
  const [showOrderId, setShowOrderId] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOrderId(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal onClose={onClose}>
      <div className="order-container">
        <div className="order-container--success">
          {showOrderId ? (
            <div className="message">
              <span style={{ fontSize: "1.2em", color: "#007bff" }}>
                Order ID: {orderId}
              </span>
            </div>
          ) : (
            <div className="image-container">
              <img
                src={OrderSuccessImage}
                alt="Success"
                className="img-fluid"
              />
              <div className="message">
                <h1>Order Successfully Placed!</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
