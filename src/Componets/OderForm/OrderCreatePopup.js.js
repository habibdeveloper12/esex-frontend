import React, { useState } from 'react';
import OrderForm from './OrderForm'; 

const OrderCreatePopup = ({ handleCreateOrder }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button onClick={handleShowPopup}>Open Popup</button>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <h2>Create New Order</h2>
            <OrderForm />
            <button onClick={handleCreateOrder}>Create Order</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCreatePopup;
