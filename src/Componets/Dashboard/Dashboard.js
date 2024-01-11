import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, Outlet, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { updateWallet } from "../../store/slices/walletSlice";

const userRole = {
  user: "user",
  admin: "admin",
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(userRole.user);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  console.log(wallet);
  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        console.log("Fetching user information...");
        const response = await axios.get(`http://localhost:5000/api/v1/user`, {
          params: {
            email: user?.email,
          },
        });
        console.log("Response from the server:", response.data);

        setUserData(response.data.data);
        dispatch(updateWallet(response.data.data.wallet));
        setRole(response.data.data.role);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInformation();
  }, [user]);

  return (
    <div className="mt-5 pt-3 bglight h-100">
      <div className="d-flex" id="wrapper">
        {/* Sidebar */}
        <div className="bg-white" id="sidebar-wrapper">
          <Navbar />

          <div className="list-group list-group-flush my-3">
            {role === userRole.user && (
              <>
                <Link
                  to="dashboarddetail"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fw-bold  fa-chart-line me-2 "></i>Dashboard
                </Link>
                <Link
                  to="order "
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas  fa-project-diagram me-2"></i>Orders
                </Link>
                <Link
                  to="balance"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-project-diagram me-2"></i>Wallet Balance
                  ${wallet}
                </Link>
                <Link
                  to="myProfile"
                  class="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i class="fas fa-chart-line me-2"></i>My Profile
                </Link>
              </>
            )}

            {role === userRole.admin && (
              <>
                <Link
                  to="income"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-paperclip me-2"></i>Income
                </Link>
                <Link
                  to="profit"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-shopping-cart me-2"></i>Profit
                </Link>
                <Link
                  to="alertorders"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-comment-dots me-2"></i>Alert Orders
                </Link>
                <Link
                  to="notedorders"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-comment-dots me-2"></i>Noted Orders
                </Link>
                <Link
                  to="usergroup"
                  className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i className="fas fa-comment-dots me-2"></i>User Group
                </Link>
                <Link
                  to="myProfile"
                  class="list-group-item list-group-item-action bg-transparent second-text fw-bold"
                >
                  <i class="fas fa-chart-line me-2"></i>My Profile
                </Link>
              </>
            )}

            <span
              href="#"
              className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
            >
              <i className="fas fa-power-off me-2"></i>Logout
            </span>
          </div>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
