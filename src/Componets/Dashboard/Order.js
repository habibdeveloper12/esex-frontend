import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button,Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import OrderForm from '../OderForm/OrderForm';

const Order = (handleCreateOrder) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    // Replace with your actual API endpoint for fetching orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get('your-api-endpoint/orders');
        const ordersData = response.data;
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchOrders();
  }, []);

  const handleAction = (orderId) => {
    // Add your action logic here
    console.log(`View details for order ${orderId}`);
  };
  const handleSearch = () => {
    // Filter orders based on search query
    const filteredOrders = orders.filter((order) =>
      Object.values(order).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // Perform any additional actions with filteredOrders if needed
    console.log(filteredOrders);
  };
  return (
    <div className=''>
      <div className=" mb-3  my-5">
        <h1 className="h2">Order</h1>
        <Button variant="success" className="col-md-2" onClick={() => handleShowPopup()}>
  Create New
</Button>
{showPopup && (
        <div className="popup-container">
          <div className="popup">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <h2 className='py-4 text-success'>Create New Order</h2>
            <OrderForm />
          </div>
        </div>
      )}
      </div >
      <div className="search-container my-4 d-block">
        <div>
          <h3>Search</h3>
        </div>
        <div className='d-flex'>
          <div className="search-input-container " style={{ marginRight: '-15px' }} >
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
      <thead className='bg-success text-white'>
          <tr className='bg-success text-white'>
            <th className='bg-success text-white'>Order Date</th>
            <th className='bg-success text-white'>Order ID</th>
            <th className='bg-success text-white'>To</th>
            <th className='bg-success text-white ps-5'>Service</th>
            <th className='bg-success text-white'>Paid</th>
            <th className='bg-success text-white'>Tracking #</th>
            <th className='bg-success text-white'>Delivery Status</th>
            <th className='bg-success text-white'>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td className='bg-success'>{order.orderDate}</td>
              <td className='bg-success'>{order.orderId}</td>
              <td className='bg-success'>{order.to}</td>
              <td className='bg-success'>{order.service}</td>
              <td className='bg-success'>{order.paid ? 'Yes' : 'No'}</td>
              <td className='bg-success'>{order.trackingNumber}</td>
              <td className='bg-success'>{order.deliveryStatus}</td>
              <td className='bg-success'>
                <Button variant="primary" onClick={() => handleAction(order.orderId)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Order;
