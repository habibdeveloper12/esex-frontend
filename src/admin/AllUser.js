import axios from "axios";
import React, { useEffect, useState } from "react";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Replace with your actual API endpoint for fetching orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/v1/user/all`
        );
        console.log(response.data, "dffffffffffffffffffffff");

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching User:", error.message);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className="mt-10 p-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">role</th>
            <th scope="col">transactionId</th>
            <th scope="col">wallet</th>
            <th scope="col">bank</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr>
                <td>{item.userId}</td>
                <td>{item.name}</td>
                <td>{item?.email}</td>
                <td>{item?.role}</td>
                <td>{item?.transactionId}</td>
                <td>{item?.wallet}</td>
                <td>{item?.yourBank}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
