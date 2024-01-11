import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import LoginForm from "../Authentic/Login";
import RegisterForm from "../Authentic/Register";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { GrSearch } from "react-icons/gr";
import { BiPhoneCall } from "react-icons/bi";
import { RiContactsBookFill } from "react-icons/ri";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { getRandomFloat } from "../../utils/getRandomId";
import axios from "axios";
import OrderForm from "../OderForm/OrderForm";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [originCountry, setOriginCountry] = useState(null);
  const [destinationCountry, setDestinationCountry] = useState(null);
  const [showZipCodeInputs, setShowZipCodeInputs] = useState(false);
  const [fromZipCode, setFromZipCode] = useState("");
  const [toZipCode, setToZipCode] = useState("");
  const [selectedOption, setSelectedOption] = useState("residential");
  const [zipCodeError, setZipCodeError] = useState("");
  const [validationTriggered, setValidationTriggered] = useState(false);
  const [weightUnit, setWeightUnit] = useState(null);
  const [showWightInput, setshowWightInput] = useState(false);
  const [isNavbarDisabled, setNavbarDisabled] = useState(false);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const findUser = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/v1/user`,
            {
              params: {
                email: user.email,
              },
            }
          );

          if (!response.data) {
            console.log(response.data);
            const registrationResponse = await axios.post(
              "http://localhost:5001/api/v1/user/register",
              {
                email: user.email,
                password: "123456",
                name: user.displayName,
                userId: getRandomFloat(1, 100, 2),
              }
            );

            console.log("User registered:", registrationResponse.data);
          }
        } catch (error) {
          console.error("Error in findUser:", error.message);
        }
      }
    };

    findUser();
  }, []);

  const weightUnitOptions = [
    { value: "lt05", label: "Less than 0.5 lb" },
    { value: "05-1", label: "0.5-1 lb" },
    { value: "101-2", label: "1.01-2 lb" },
    { value: "201-3", label: "2.01-3 lb" },
  ];
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
    console.log(`Performing search for: ${searchQuery}`);
    navigate(`/details/${searchQuery}`);
  };
  const openLoginModal = () => {
    setLoginModalOpen(true);
    setNavbarDisabled(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
    setNavbarDisabled(false);
  };
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setNavbarDisabled(true);
  };

  const closeRegisteModal = () => {
    setRegisterModalOpen(false);
    setNavbarDisabled(false);
  };

  useEffect(() => {
    // Fetch country data from the REST Countries API
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryOptions = data.map((country) => ({
          value: country.alpha2Code,
          label: country.name.common,
          flag: country.flags.svg,
          zipCodeFormat: country.address ? country.address.postalCode : null,
        }));
        // Sort countries alphabetically by label
        countryOptions.sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryOptions);

        // Find and set the United States as the default origin country
        const usaCountry = countryOptions.find(
          (country) => country.label === "United States"
        );
        setOriginCountry(usaCountry);
        const defaultDestinationCountry = countryOptions.find(
          (country) => country.label === "United States"
        );
        setDestinationCountry(defaultDestinationCountry);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleOriginChange = (selectedOption) => {
    setOriginCountry(selectedOption);
  };

  const handleDestinationChange = (selectedOption) => {
    setDestinationCountry(selectedOption);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleOrderForm = () => {
    // Check if the user is authenticated
    if (isAuthenticated) {
      // Render the OrderForm component or display a modal, etc.
      // For simplicity, let's just log a message here.
      console.log('Show OrderForm');
    } else {
      // Redirect the user to the login page or show a login modal
      console.log('Redirect to login page or show login modal');
    }
  };


  const handleQuickQuoteClick = () => {
    if (!validationTriggered) {
      // Show ZIP code inputs on the first click
      setshowWightInput(true);
      setShowZipCodeInputs(true);
      setValidationTriggered(true);
    } else {
      // Validate ZIP codes on the second click
      if (!isValidZipCode(fromZipCode, originCountry)) {
        setZipCodeError("Invalid Zipcode");
        return false;
      }

      if (!isValidZipCode(toZipCode, destinationCountry)) {
        alert("Invalid or missing To Zip Code for the selected country.");
        return;
      }
    }
  };

  const isValidZipCode = (zipCode, country) => {
    if (!country || !country.zipCodeFormat) {
      // Country or zip code format is not available
      return false;
    }

    // Simple validation: Check if the entered ZIP code matches the expected format
    const zipCodeRegex = new RegExp(country.zipCodeFormat);
    return zipCodeRegex.test(zipCode);
  };

  return (
    <div>
      {/* nabvar content */}
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
                    src="./logo2.png"
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
                  <Link className="nav-link fw-semibold" to="/dashboard/dashboarddetail">
                    Dashboard
                  </Link>
                </li>
                    <li className="nav-item ms-3" onClick={() => signOut(auth)}>
                      <Link className="nav-link">
                        <span className="ms-1 fw-semibold">Sign Out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {" "}
                    <li className="nav-item ms-3">
                      <Link
                        className="nav-link"
                        to=""
                        onClick={openLoginModal}
                      >
                        <CgProfile />
                        <span className="ms-1 fw-semibold">Sign In</span>
                      </Link>
                    </li>
                    <li className="nav-item ms-3">
                      <Link
                        className="nav-link"
                        to="#"
                        onClick={openRegisterModal}
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
        {isLoginModalOpen && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <span className="close" onClick={closeLoginModal}>
                &times;
              </span>
              <LoginForm />
            </div>
          </div>
        )}
        {isRegisterModalOpen && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <span className="close" onClick={closeRegisteModal}>
                &times;
              </span>
              <RegisterForm />
            </div>
          </div>
        )}
      </div>
      {/* nabvar content end */}

      {/* map section */}

      <div className="bg-light">
        <div className="mainpage mobileview container justify-content-between align-items-center">
          <div className="text-left mobileviewtext">
            <h2 className="fw-bold textinfo fs-3">
              The Best Way to Ship Documents Online
            </h2>
            <p>
              EASYEX offers the best rates from top carriers and everything you
              need for shipping documents worldwide in one platform. Set up in
              seconds. Save time and money on <br />
              shipping.
            </p>
            <button className="btn btn-warning" onClick={handleQuoteClick}>
              Start Shipping Now
            </button>
          </div>
          <div className="mt-5 imgview">
            <img
              src="./main.png"
              alt="Logo"
              className="img-fluid"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
      {/* map sectionn end */}

      {/* ship start */}
      <div ref={quoteRef}>
        <div className="bglightship">
          <div className="dflex py-5 container">
            <div className="bg-white rounded p-5">
              <div className="dflex align-items-center justify-content-between">
                <div className="pe-1" style={{ flex: "1" }}>
                  <label className="me-3">Ship from</label>
                  <Select
                    value={originCountry}
                    onChange={handleOriginChange}
                    options={countries}
                    isSearchable
                    // isDisabled
                    placeholder="Select country"
                    formatOptionLabel={({ label, flag }) => (
                      <div className="d-flex align-items-center">
                        <img
                          src={flag}
                          alt={label}
                          className="me-2"
                          style={{ width: "1.5em", height: "1.5em" }}
                        />
                        {label}
                      </div>
                    )}
                  />
                </div>
                <div className="ps-1" style={{ flex: "1" }}>
                  <label className="me-3">Ship to</label>
                  <Select
                    value={originCountry && destinationCountry}
                    onChange={handleDestinationChange}
                    options={countries}
                    isSearchable
                    placeholder="Select country"
                    formatOptionLabel={({ label, flag }) => (
                      <div className="d-flex align-items-center">
                        <img
                          src={flag}
                          alt={label}
                          className="me-2"
                          style={{ width: "1.5em", height: "1.5em" }}
                        />
                        {label}
                      </div>
                    )}
                  />
                </div>
              </div>

              {showZipCodeInputs && (
                <div
                  style={{
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="zipcode-inputs dflex"
                    style={{ marginBottom: "20px" }}
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Enter From Zip Code"
                        value={fromZipCode}
                        onChange={(e) => setFromZipCode(e.target.value)}
                        style={{
                          padding: "10px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          marginRight: "10px",
                          width: "180px",
                          fontSize: "14px",
                        }}
                      />
                      <div style={{ color: "red" }}>{zipCodeError}</div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Enter To Zip Code"
                        value={toZipCode}
                        onChange={(e) => setToZipCode(e.target.value)}
                        style={{
                          padding: "10px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "180px",
                          fontSize: "14px",
                        }}
                      />
                      <div style={{ color: "red" }}>{zipCodeError}</div>
                    </div>
                  </div>
                  <div className="radio-buttons" style={{ textAlign: "right" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        color: "#333",
                        fontWeight: "bold",
                      }}
                    >
                      <input
                        type="radio"
                        value="residential"
                        checked={selectedOption === "residential"}
                        onChange={() => setSelectedOption("residential")}
                      />
                      &nbsp; Residential
                    </label>
                    <label
                      style={{
                        display: "block",
                        color: "#333",
                        fontWeight: "bold",
                      }}
                    >
                      <input
                        type="radio"
                        value="commercial"
                        checked={selectedOption === "commercial"}
                        onChange={() => setSelectedOption("commercial")}
                      />
                      &nbsp; Commercial
                    </label>
                  </div>
                </div>
              )}

              {showWightInput && (
                <div className="mt-2">
                  <p>Weight (including packaging)</p>
                  <Select
                    value={weightUnit}
                    onChange={(selectedOption) => setWeightUnit(selectedOption)}
                    options={weightUnitOptions}
                    isSearchable
                    placeholder="Select weight unit"
                  />
                </div>
              )}
              <div className="mt-4">
                <button
                  className="btn btn-warning btn-lg paddingpcbtn"
                  onClick={handleQuickQuoteClick}
                >
                  Quick Quote
                </button>
              </div>

              <div className="mt-3">
                <button className="btn btn-info btn-lg paddingpcbtn" onClick={handleOrderForm}>
                  Create Level
                </button>
              </div>
            </div>

            <div className="paddingpc">
              <h2 className="fw-bold fs-3 textinfo">
                Package Type Makes Difference
              </h2>
              <p>
                By selecting the appropriate package type, you may frequently
                reduce delivery costs even more.
              </p>
              <p className="mt-3">Ship Smart, Save More.</p>
            </div>
          </div>

          {/* quote ship from */}

          <div></div>
        </div>
      </div>
      {/* ship end */}
      {isAuthenticated && <div className="mt-3"><OrderForm /></div>}
      {/* plane start  */}
      <div>
        <div className="bglightt">
          <div className="container">
            <div className="dflex align-items-center justify-content-center">
              <div className="px-3">
                <h2 className="fw-bold fs-3 textinfo pb-2">
                  International Shipping, Done Right!
                </h2>
                <p>DDP (Duty & Taxes Paid Delivery) Service Provided..</p>
                <ul className="custom-list">
                  <li>
                    <span className="icon">&#10003;</span>
                    Hassle-Free Custom Clearance
                  </li>
                  <li>
                    <span className="icon">&#10003;</span>
                    TAX FREE! Duty & Taxes Prepaid by Easyex
                  </li>
                  <li>
                    <span className="icon">&#10003;</span>
                    Speed Up without Delay
                  </li>
                </ul>
                <p>
                  Did international shipping frustrate you? NO Need to Worry!
                  With the DDP (delivery duty paid) service, we not only handle
                  customs clearance but also prepay all duties and taxes in
                  order to speed up international delivery without delay. Now
                  You can relax knowing that everything will be taken care of!
                </p>
              </div>
              <div className="py-4">
                <img
                  src="./air.png"
                  alt="Logo"
                  className="img-fluid"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* plane end  */}

      {/* revew start */}

      {/* revew end */}

      {/* footer */}
      <div ref={supportRef}>
        <div className="footercolor text-white">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="footer-section">
                  <h4 className="text-white">About Us</h4>
                  <div className="mt-4">
                    <p className="text-white">About Esayex</p>
                    <p className="text-white">Our Advantages</p>
                    <p className="text-white">Our Overseas</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="footer-section">
                  <h4 className="text-white">Tools</h4>
                  <div className="mt-4">
                    <p className="text-white">
                      <TbDeviceLandlinePhone />
                      <span className="ms-1">Get Shipping Estimate</span>
                    </p>
                    <p className="text-white">
                      <GrSearch />
                      <span className="ms-1">Track Your Package</span>
                    </p>
                    <p className="text-white">
                      <BiSupport />
                      <span className="ms-1">Help Center</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="footer-section">
                  <h4 className="text-white">Contact</h4>
                  <div className="mt-4">
                    <p className="text-white">
                      <RiContactsBookFill />
                      <span className="ms-1">Contact Us</span>
                    </p>
                    <p className="text-white">
                      <BiPhoneCall />
                      <span className="ms-1">xxxx4555555</span>
                    </p>
                    <p className="text-white">
                      {" "}
                      <BiSupport />
                      <span className="ms-1">help@Easyex.com</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="footer-section">
                  <h4 className="text-white">Newsletter</h4>
                  <p className="text-white mt-3">
                    Stay informed about our latest promotions and updates!
                  </p>
                  <form className="mt-3">
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email Address"
                        aria-label="Your Email Address"
                        aria-describedby="basic-addon2"
                      />
                      <button
                        className="btn btn-warning"
                        type="button"
                        id="basic-addon2"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <hr />
            {/* Additional section for copyright and links */}
            <div className="row pt-3">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>Copyright © 2023 EASYEX</div>
                  <div className="d-flex">
                    <span
                      onClick={() => navigate("/terms")}
                      className=" pointerb d-block text-white"
                    >
                      Terms & Condition
                    </span>
                    <span
                      onClick={() => navigate("/priv")}
                      className="pointerb d-block text-white ms-3"
                    >
                      Privacy Statement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
