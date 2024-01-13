import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap"; // Import Bootstrap card components
import {
  FaShoppingCart,
  FaTruck,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa"; // Import icons

const DashboardDetail = () => {
  const [savedOrders, setSavedOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [inTransitOrders, setInTransitOrders] = useState([]);
  const [alertOrders, setAlertOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders data from your API endpoint
        const response = await axios.get("your-api-endpoint/orders");
        const orders = response.data;

        // Filter orders based on tracking status
        const saved = orders.filter(
          (order) => order.trackingStatus === "saved"
        );
        const delivered = orders.filter(
          (order) => order.trackingStatus === "delivered"
        );
        const inTransit = orders.filter(
          (order) => order.trackingStatus === "in-transit"
        );
        const alert = orders.filter((order) =>
          ["delay", "pending", "exception"].includes(order.trackingStatus)
        );

        // Set state with filtered orders
        setSavedOrders(saved);
        setDeliveredOrders(delivered);
        setInTransitOrders(inTransit);
        setAlertOrders(alert);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchData();
  }, []);

  const OrderCard = ({ title, count, icon, color }) => (
    <Col md={6} lg={3} className="cursor-pointer">
      <Card className={`bg-${color} text-white`}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="m-b-20">{title}</h6>
              <div className="d-flex">
                <div className="text-right w-100">
                  <h2>{icon}</h2>
                </div>
                <div className="ms-auto w-100">
                  <h2 style={{ paddingLeft: "170px" }}>{count}</h2>
                </div>
              </div>
              <p className="m-b-0">{`All ${title}`}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="w-100 mt-5">
      <main className="col-md-9 ms-sm-auto bglight col-lg-12 px-5 py-3">
        <div className="pt-3 pb-2 mb-3">
          <h1>Dashboard</h1>
        </div>
        <Row>
          <OrderCard
            title="Total Orders"
            count={savedOrders.length}
            icon={<FaShoppingCart />}
            color="primary"
          />
          <OrderCard
            title="Delivered Orders"
            count={deliveredOrders.length}
            icon={<FaCheck />}
            color="success"
          />
          <OrderCard
            title="InTransit Orders"
            count={inTransitOrders.length}
            icon={<FaTruck />}
            color="info"
          />
          <OrderCard
            title="Alert Orders"
            count={alertOrders.length}
            icon={<FaExclamationCircle />}
            color="warning"
          />
        </Row>
      </main>
    </div>
  );
};

export default DashboardDetail;
