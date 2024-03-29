import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import OrderForm from "../OderForm/OrderForm";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import OrderDetails from "../savedOrder/OrderDetails";
import OrderDetailsA from "./OrderDetails";

const Order = (handleCreateOrder) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [user] = useAuthState(auth);
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleOrderShowPopup = () => {
    setShowOrderPopup(true);
  };

  const handleOrderClosePopup = () => {
    setShowOrderPopup(false);
  };
  useEffect(() => {
    // Replace with your actual API endpoint for fetching orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/v1/order/get-order?email=${user?.email}`
        );
        console.log(response);
        const ordersData = response.data.data;
        const filter = ordersData.filter((item) => item.orderItem == "Saved");
        setOrders(filter);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);
  function formatDate(originalDate) {
    const date = new Date(originalDate);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  console.log(orders);
  const handleAction = (orderId) => {
    // Add your action logic here
    console.log(`View details for order ${orderId}`);
  };
  const handleSearch = () => {
    // Filter orders based on search query
    const filteredOrders = orders.filter((order) =>
      Object.values(order).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // Perform any additional actions with filteredOrders if needed
    console.log(filteredOrders);
  };
  return (
    <div className="">
      <div className=" mb-3  my-5">
        <h1 className="h2">Order</h1>
        <Button
          variant="success"
          className="col-md-2"
          onClick={() => handleShowPopup()}
        >
          Create New
        </Button>
        {showPopup && (
          <div className="popup-container">
            <div className="popup">
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <h2 className="py-4 text-success">Create New Order</h2>
              <OrderForm />
            </div>
          </div>
        )}
      </div>
      <div className="search-container my-4 d-block">
        <div>
          <h3>Search</h3>
        </div>
        <div className="d-flex">
          <div
            className="search-input-container "
            style={{ marginRight: "-15px" }}
          >
            <Form className="mb-3">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search anything"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
          <div>
            <Button variant="warning" onClick={handleSearch}>
              <FaSearch className="search-icon" />
            </Button>
          </div>
        </div>
      </div>
      <Table striped bordered hover>
        <thead className="bg-success text-white">
          <tr className="bg-success text-white">
            <th className="bg-success text-white">Order Date</th>
            <th className="bg-success text-white">Order ID</th>
            <th className="bg-success text-white">To</th>
            <th className="bg-success text-white ps-5">Service</th>
            <th className="bg-success text-white">Paid</th>
            <th className="bg-success text-white">Tracking #</th>
            <th className="bg-success text-white">Delivery Status</th>
            <th className="bg-success text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <>
              {showOrderPopup && (
                <div className="popup-container">
                  <div className="popup">
                    <span className="close" onClick={handleOrderClosePopup}>
                      &times;
                    </span>
                    <h2 className="py-4 text-success"></h2>
                    <OrderDetailsA {...{ order }} />
                  </div>
                </div>
              )}
              <tr key={order.orderId}>
                <td className="bg-success">{formatDate(order.createdAt)}</td>
                <td className="bg-success">{order.orderId}</td>
                <td className="bg-success">
                  {order.recipient.country} {order.recipient.zip}
                </td>
                <td className="bg-success">{order?.shipment?.service}</td>
                <td className="bg-success">{order.paid ? "Yes" : "No"}</td>
                <td className="bg-success">{order.trackingNumber}</td>
                <td className="bg-success">{"Pending"}</td>
                <td className="bg-success">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={handleOrderShowPopup}
                  >
                    view
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Order;
