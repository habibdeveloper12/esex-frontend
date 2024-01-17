import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import auth from "../firebase.init";
import OrderForm from "../Componets/OderForm/OrderForm";
import OrderDetails from "../Componets/savedOrder/OrderDetails";
import OrderDetailsA from "../Componets/Dashboard/OrderDetails";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [shipOrders, setShipOrders] = useState([]);
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
          `http://localhost:5001/api/v1/order/all`
        );
        console.log(response);
        const ordersData = response.data;
        const savedfilter = ordersData.filter(
          (item) => item.orderItem == "Saved"
        );
        const shipfilter = ordersData.filter(
          (item) => item.orderItem != "Saved"
        );
        setOrders(savedfilter);
        setShipOrders(shipfilter);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);
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
  const [date, setDate] = useState(new Date());
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
      <Tabs>
        <TabList>
          <Tab>Saved</Tab>
          <Tab>Shipped</Tab>
        </TabList>

        <TabPanel>
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
              {orders.map((order) => {
                console.log(order);
                return (
                  <>
                    {showOrderPopup && (
                      <div className="popup-container">
                        <div className="popup">
                          <span
                            className="close"
                            onClick={handleOrderClosePopup}
                          >
                            &times;
                          </span>
                          <h2 className="py-4 text-success"></h2>
                          <OrderDetailsA {...{ order }} />
                        </div>
                      </div>
                    )}
                    <tr key={order.orderId}>
                      <td className="bg-success">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="bg-success">{order.orderId}</td>
                      <td className="bg-success">
                        {order.recipient.country} {order.recipient.zip}
                      </td>
                      <td className="bg-success">{order?.shipment?.service}</td>
                      <td className="bg-success">
                        {order.paid ? "Yes" : "No"}
                      </td>
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
                );
              })}
            </tbody>
          </Table>
        </TabPanel>
        <TabPanel>
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
              {shipOrders.map((order) => {
                console.log(order);
                return (
                  <>
                    {showOrderPopup && (
                      <div className="popup-container">
                        <div className="popup">
                          <span
                            className="close"
                            onClick={handleOrderClosePopup}
                          >
                            &times;
                          </span>
                          <h2 className="py-4 text-success"></h2>
                          <OrderDetails {...{ order, date: order.createdAt }} />
                        </div>
                      </div>
                    )}
                    <tr key={order.orderId}>
                      <td className="bg-success">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="bg-success">{order.orderId}</td>
                      <td className="bg-success">
                        {order.recipient.country} {order.recipient.zip}
                      </td>
                      <td className="bg-success">{order?.shipment?.service}</td>
                      <td className="bg-success">
                        {order.paid ? "Yes" : "No"}
                      </td>
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
                );
              })}
            </tbody>
          </Table>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AllOrders;
