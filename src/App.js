import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Componets/Home/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Componets/Home/Home";
import SearchDetails from "./Componets/Search/SearchDetails";
import Terms from "./Componets/Footersection/Terms";
import Privecy from "./Componets/Footersection/Privecy";
import "./App.css";
import Login from "./Componets/Authentic/Login";
import Register from "./Componets/Authentic/Register";
import Dashboard from "./Componets/Dashboard/Dashboard";
import RequireAuth from "./hooks/RequireAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import DashboardDetail from "./Componets/Dashboard/DashboardDetails";
import OrderForm from "./Componets/OderForm/OrderForm";
import WalletBalance from "./Componets/Dashboard/WalletBalance";
import Order from "./Componets/Dashboard/Order";
import MyProfile from "./Componets/Dashboard/MyProfile";

function App() {
  const user = useAuthState(auth);
  return (
    <div className="">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<SearchDetails />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/priv" element={<Privecy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />


          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
           <Route path="/dashboard/dashboarddetail" element={<DashboardDetail />} />
           <Route path="/dashboard/order" element={<Order />} />
           <Route path="/dashboard/balance" element={<WalletBalance />} />
           <Route path="/dashboard/myProfile" element={ <MyProfile/>} />
            </Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
