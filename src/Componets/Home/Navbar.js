import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Dashboard from "../Dashboard/Dashboard";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavbarDisabled, setNavbarDisabled] = useState(false);
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const supportRef = useRef(null);
  const quoteRef = useRef(null);
  const handleSupportClick = () => {
    supportRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleQuoteClick = () => {
    quoteRef.current.scrollIntoView({ behavior: "smooth" });
    const topPadding = 130;
    const rect = quoteRef.current.getBoundingClientRect();
    const offset = rect.top + window.scrollY - topPadding;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };
  const handleSearch = () => {
    // Implement your search logic here based on the searchQuery
    console.log(`Performing search for: ${searchQuery}`);
    
    // Navigate to the details page with the tracking number
    navigate(`/details/${searchQuery}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to the homepage after signing out
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  return (
    // Dashboard navbar only not homapage navbar
      // Dashboard navbar only not homapage navbar
        // Dashboard navbar only not homapage navbar
          // Dashboard navbar only not homapage navbar
    <div>
    <nav
      className={`navbar fixed-top navbar-expand-lg navbar-white bg-white ${
        isNavbarDisabled ? "disabled" : ""
      }`}
    >
      <div className="container">
        <div className="d-flex">
          <div>
            <Link className="navbar-brand" to="/">
              <img
                src="../logo2.png"
                alt="Logo"
                style={{ width: "40%", height: "auto" }}
              />
            </Link>
          </div>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="search-container mx-auto border rounded p-2 shadow">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white border-0">
                  <IoSearchOutline className="iconn" />
                </span>
              </div>
              <input
                type="text"
                className="form-control search-input border-0"
                placeholder="Track My Package"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" onClick={handleSupportClick}>
                <BiSupport />
                <span className="ms-1 fw-semibold">Support</span>
              </Link>
            </li>
            <li className="nav-item ms-3">
              <Link className="nav-link" onClick={handleQuoteClick}>
                <TbDeviceLandlinePhone />
                <span className="ms-1 fw-semibold">Quote</span>
              </Link>
            </li>
            {user ? (
          <>
            <li className="nav-item ms-3">
              <Link className="nav-link fw-semibold" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item ms-3" onClick={handleSignOut}>
                    <Link className="nav-link">
                      <span className="ms-1 fw-semibold">Sign Out</span>
                    </Link>
                  </li>
              </>
            ) : (
              <>
                {" "}
                <li className="nav-item ms-3">
                </li>
                <li className="nav-item ms-3">
                  <Link
                    className="nav-link"
                    to="#"
                  >
                    <button className="btn btn-warning">
                      Sign Up Free
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;
