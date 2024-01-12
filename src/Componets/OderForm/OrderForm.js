import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaRegAddressBook } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFieldArray, useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import AddressBookPopup from "./AddressBookPopup";
import AddressBookPopupr from "./AddressBookPopupr";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../store/slices/counterSlice";
import { nextStep } from "../../store/formSlice";
import Package from "./Package";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FedexRates from "./FedexRates";
const OrderForm = () => {
  const [user] = useAuthState(auth);
 const [rate,setRate]=useState(false)
  const [countries, setCountries] = useState([]);
  const defaultCountry = { value: "United States", label: "United States" };
  const [destinationCountry, setDestinationCountry] = useState(defaultCountry);
  const [originCountry, setOriginCountry] = useState(defaultCountry);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupr, setShowPopupr] = useState(false);
  const { control, handleSubmit, register} = useForm({
    defaultValues: {
      packages: [{ qty: "", weight: "", unit: "lb", length: "", width: "", height: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages",
  });

  const onSubmit = async(data) => {
    const obj={
      sender:senderFormData,
      recipient:recipientFormData,
      parcel: data.packages,
    }
    const response = await axios.post('http://localhost:5001/api/v1/order/create', {
      shipment: {
        from_address: senderFormData,
        to_address: recipientFormData,
        parcels: data.packages,
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response)

    // Extract rates from the response
    const rates = response.data.rates;
   setRate(true)
    console.log(obj);
  };
  const handleOriginChange = (selectedCountry) => {
    console.log("Selected Country:", selectedCountry);
    setOriginCountry(selectedCountry);
    console.log(originCountry);
    setSenderFormData((prevData) => ({
      ...prevData,
      country: selectedCountry.value,
    }));
  };

  const handleDestinationChange = (selectedOption) => {
    setDestinationCountry(selectedOption);
  };
  const [senderFormData, setSenderFormData] = useState({
    name: "",
    company: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    tax: "",
    country: defaultCountry.value,
  });

  const [recipientFormData, setRecipientFormData] = useState({
    name: "",
    company: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    tax: "",
    country: defaultCountry.value,
  });
  const { currentStep } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(nextStep());
    console.log("df");
  };
  console.log(currentStep);
  const defaultAddress = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/v1/user/default/address?email=${user?.email}`
      );

      const sender = response.data.defaultAddress.sender;
      console.log("Received sender data:", sender);
 
      setSenderFormData({
        name: sender.name || "",
        company: sender.company || "",
        street1: sender.street1 || "",
        street2: sender.street2 || "",
        city: sender.city || "",
        state: sender.state || "",
        zip: sender.zip || "",
        phone: sender.phone || "",
        email: sender.email || "",
        tax: sender.tax || "",
        country: sender.country || defaultCountry.value,
      });
   
      console.log("Updated sender form data:", sender);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  console.log(senderFormData);
  useEffect(() => {
    console.log("country.json");
    const fetchCountries = async () => {
      try {
        const response = await fetch("/country.json");

        if (!response.ok) {
          throw new Error("Failed to fetch JSON data");
        }
        console.log(response);
        // Parse the JSON data
        const data = await response.json();
        console.log(data);
        // Map countries and convert names to values
        const countryOptions = data.map((country) => ({
          value: country.code,
          label: country.name,
          flag: country.emoji,
        }));

        countryOptions.sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryOptions);

        // Set origin country and default destination country
        const usaCountry = countryOptions.find(
          (country) => country.value === "US"
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

    // Add the mapping function

    defaultAddress();
    fetchCountries();
  }, [user?.email]);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "sender") {
      setSenderFormData({
        ...senderFormData,
        [name]: value,
        phone: phone,
      });
    } else if (section === "recipient") {
      setRecipientFormData({
        ...recipientFormData,
        [name]: value,
        phone: rphone,
      });
    }
  };

  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState();
  const [rphone, setRPhone] = useState();
  const handleSaveAddress = async () => {
    const userNickname = prompt("Please enter a nickname for this address:");
    if (!userNickname) {
      // User clicked cancel or entered an empty string
      return;
    }
    setNickname(userNickname);

    if (!user?.email) {
      return alert("please sign in for save address ");
    }
    const dataToSave = {
      sender: { ...senderFormData },
      nickname: userNickname,
      userEmail: user?.email,
    };

    try {
      // Check if the nickname already exists
      const response = await axios.post(
        "http://localhost:5001/api/v1/user/check-nickname",
        { nickname: userNickname }
      );

      if (response.status === 200 && response.data.exists) {
        // Display a confirmation prompt
        const shouldOverwrite = window.confirm(
          "Nickname already exists. Do you want to overwrite?"
        );

        if (shouldOverwrite) {
          // Proceed with saving/updating the address
          await saveAddress(dataToSave);
          console.log("Address updated successfully.");
        } else {
          console.log("Address not overwritten.");
        }
      } else {
        // Nickname does not exist, proceed with saving the address
        await saveAddress(dataToSave);
        console.log("Address saved successfully.");
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
    }
  };

  const isSenderDataValid = (senderData) => {
    return (
      senderData.name &&
      senderData.company &&
      senderData.street1 &&
      senderData.city &&
      senderData.state &&
      senderData.zip &&
      senderData.country &&
      senderData.phone &&
      senderData.email &&
      senderData.tax
    );
  };

  const saveAddress = async (data) => {
    if (!isSenderDataValid(data.sender)) {
      toast.error(
        "Sender information is missing or empty. Please fill in all fields.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      return;
    }
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/user/save-address",
        data
      );
      console.log("Full response:", response);

      if (
        response.data.success !== undefined &&
        response.data.success === false
      ) {
        toast.error(`Error: ${response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Address saved successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error saving address:", error.message);
      toast.error("An error occurred while saving the address.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // recipient function
  const handleSaveAddressr = async () => {
    const userNickname = prompt(
      "Please enter a nickname for recipent this address:"
    );
    if (!userNickname) {
      // User clicked cancel or entered an empty string
      return;
    }
    setNickname(userNickname);

    // Prepare data to save
    const dataToSaver = {
      recipient: { ...recipientFormData },
      nickname: userNickname,
      userEmail: user?.email,
    };

    try {
      // Check if the nickname already exists
      const response = await axios.post(
        "http://localhost:5001/api/v1/user/check-nicknamer",
        { nickname: userNickname }
      );

      if (response.status === 200 && response.data.exists) {
        // Display a confirmation prompt
        const shouldOverwrite = window.confirm(
          "Nickname already exists. Do you want to overwrite?"
        );

        if (shouldOverwrite) {
          // Proceed with saving/updating the address
          await saveAddressr(dataToSaver);
          console.log("Address updated successfully.");
        } else {
          console.log("Address not overwritten.");
        }
      } else {
        // Nickname does not exist, proceed with saving the address
        await saveAddressr(dataToSaver);
        console.log("Address saved successfully.");
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
    }
  };

  const isrecipientDataValidr = (recipientData) => {
    return (
      recipientData.name &&
      recipientData.company &&
      recipientData.street1 &&
      recipientData.city &&
      recipientData.state &&
      recipientData.zip &&
      recipientData.country &&
      recipientData.phone &&
      recipientData.email &&
      recipientData.tax
    );
  };

  const saveAddressr = async (data) => {
    if (!isrecipientDataValidr(data.recipient)) {
      toast.error(
        "recipient information is missing or empty. Please fill in all fields.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/user/save-addressr",
        data
      );
      console.log("Full response:", response);

      if (
        response.data.success !== undefined &&
        response.data.success === false
      ) {
        toast.error(`Error: ${response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Address saved successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Error saving address:", error.message);
      toast.error("An error occurred while saving the address.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };
  const handleShowPopupr = () => {
    setShowPopupr(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleClosePopupr = () => {
    setShowPopupr(false);
  };

  console.log(senderFormData);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        <div className="bglight">
          <div className="dflex container  bg-white">
            <div className="form-group form-group-mobile mx-2 w-100">
              <h2 className="text-black">
                Sender |{" "}
                <FaRegAddressBook
                  style={{
                    fontSize: "25px",
                    color: "#0dcaf0",
                    cursor: "pointer",
                  }}
                />
                <span
                  className="text-info fs-4"
                  style={{ cursor: "pointer" }}
                  onClick={handleShowPopup}
                >
                  Address Book
                </span>
                {showPopup && <AddressBookPopup onClose={handleClosePopup} />}
              </h2>
              <div className="d-flex">
                <div className="w-100 pe-3">
                  <label className="py-1">Name*</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input bglight"
                    value={senderFormData.name}
                    onChange={(e) => handleInputChange(e, "sender")}
                  />
                </div>

                <div className="w-100 ps-2">
                  <label className="py-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    className="form-input bglight"
                    value={senderFormData.company}
                    onChange={(e) => handleInputChange(e, "sender")}
                  />
                </div>
              </div>

              <label className="py-1">Country:</label>
              <Select
                value={originCountry}
                onChange={handleOriginChange}
                options={countries}
                isSearchable
                // isDisabled
                placeholder="Select country"
                formatOptionLabel={({ label, flag }) => (
                  <div className="d-flex align-items-center gap-3 ">
                    <div> {flag}</div>

                    {label}
                  </div>
                )}
              />
              <label className="py-1"> Address 1*</label>
              <input
                type="text"
                name="street1"
                className="form-input bglight"
                value={senderFormData.street1}
                onChange={(e) => handleInputChange(e, "sender")}
              />

              <label className="py-1">Address 2</label>
              <input
                type="text"
                name="street2"
                className="form-input bglight"
                value={senderFormData.street2}
                onChange={(e) => handleInputChange(e, "sender")}
              />

              <div className="d-flex">
                <div className="w-100 pe-3">
                  <label className="py-1">City*</label>
                  <input
                    type="text"
                    name="city"
                    className="form-input bglight"
                    value={senderFormData.city}
                    onChange={(e) => handleInputChange(e, "sender")}
                  />
                </div>

                <div className="w-100 ps-2">
                  <label className="py-1">State/Province*</label>
                  <input
                    type="text"
                    name="state"
                    className="form-input bglight"
                    value={senderFormData.state}
                    onChange={(e) => handleInputChange(e, "sender")}
                  />
                </div>
              </div>

              <div className="d-flex">
                <div className="w-100 pe-3">
                  <label className="py-1">Zip/Postal Code*</label>
                  <input
                    type="text"
                    name="zip"
                    className="form-input bglight"
                    value={senderFormData.zip}
                    onChange={(e) => handleInputChange(e, "sender")}
                  />
                </div>

                <div className="w-100 ps-2">
                  <label className="py-1">Phone*</label>
                  <PhoneInput
                    country={originCountry.value.toLowerCase()}
                    value={phone}
                    // className="form-input bglight"
                    onChange={(phone) => setPhone(phone)}
                  />
                  {/* <input
                    type="text"
                    name="phone"
                    className="form-input bglight"
                    value={senderFormData.phone}
                    onChange={(e) => handleInputChange(e, "sender")}
                  /> */}
                </div>
              </div>

              <label className="py-1">Email*</label>
              <input
                type="text"
                name="email"
                placeholder="To recived notificaition"
                className="form-input bglight"
                value={senderFormData.email}
                onChange={(e) => handleInputChange(e, "sender")}
              />

              <div className="d-flex justify-content-between">
                <div className="py-2">
                  <div className="d-block">
                    <div>
                      <label>
                        <span className="fw-semibold text-black">TAX ID</span>{" "}
                        (vat, eori, ioss, pan, etc)
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="tax"
                        placeholder="Vat:123456789"
                        className="rounded"
                        value={senderFormData.tax}
                        onChange={(e) => handleInputChange(e, "sender")}
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-auto pt-4">
                  <button
                    className="rounded bg-warning"
                    onClick={handleSaveAddress}
                  >
                    Save the Address
                  </button>
                </div>
              </div>
            </div>

            {/* recipient */}

            <div className="form-group form-group-mobile mx-2 w-100">
              <h2 className="text-black">
                Recipient |{" "}
                <FaRegAddressBook
                  style={{ fontSize: "25px", color: "#0dcaf0" }}
                />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={handleShowPopupr}
                  className="text-info fs-4"
                >
                  Address Book
                </span>{" "}
              </h2>
              {showPopupr && <AddressBookPopupr onClose={handleClosePopupr} />}
              <div className="d-flex">
                <div className="w-100 pe-3">
                  <label className="py-1">Name*</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input bglight"
                    value={recipientFormData.name}
                    onChange={(e) => handleInputChange(e, "recipient")}
                  />
                </div>

                <div className="w-100 ps-2">
                  <label className="py-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    className="form-input bglight"
                    value={recipientFormData.company}
                    onChange={(e) => handleInputChange(e, "recipient")}
                  />
                </div>
              </div>
              <label className="py-1">Country*</label>
              <Select
                value={destinationCountry}
                onChange={handleDestinationChange}
                options={countries}
                isSearchable
                placeholder="Select country"
                formatOptionLabel={({ label, flag }) => (
                  <div className="d-flex align-items-center gap-3 ">
                    <div> {flag}</div>

                    {label}
                  </div>
                )}
              />
              <label className="py-1">Address 1*</label>
              <input
                type="text"
                name="street1"
                required
                className="form-input bglight"
                value={recipientFormData.street1}
                onChange={(e) => handleInputChange(e, "recipient")}
              />

              <label className="py-1">Address 2</label>
              <input
                type="text"
                name="street2"
                className="form-input"
                value={recipientFormData.street2}
                onChange={(e) => handleInputChange(e, "recipient")}
              />

              <div className="d-flex">
                <div className="w-100 pe-3">
                  <label className="py-1">City*</label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="form-input bglight"
                    value={recipientFormData.city}
                    onChange={(e) => handleInputChange(e, "recipient")}
                  />
                </div>

                <div className="w-100 ps-2">
                  <label className="py-1">State/Province*</label>
                  <input
                    type="text"
                    name="state"
                    className="form-input bglight"
                    value={recipientFormData.state}
                    onChange={(e) => handleInputChange(e, "recipient")}
                  />
                </div>
              </div>

              <div className="d-flex">
                <div className="w-100 pe-3">
                  <label className="py-1">Zip/Postal Code*</label>
                  <input
                    type="text"
                    name="zip"
                    required
                    className="form-input bglight"
                    value={recipientFormData.zip}
                    onChange={(e) => handleInputChange(e, "recipient")}
                  />
                </div>
                <div className="w-100 ps-2">
                  <label className="py-1">Phone*</label>
                  <PhoneInput
                    country={destinationCountry.value.toLowerCase()}
                    value={rphone}
                    // className="form-input bglight"
                    onChange={(e) => setRPhone(e)}
                  />
                  {/* <input
                    type="text"
                    name="phone"
                    required
                    className="form-input bglight"
                    value={recipientFormData.phone}
                    onChange={(e) => handleInputChange(e, "recipient")}
                  /> */}
                </div>
              </div>

              <label className="py-1">
                Email*{" "}
                <span className="text-primary">Copy shipper's email</span>
              </label>
              <input
                type="text"
                name="email"
                required
                placeholder="To recived notificaition"
                className="form-input bglight"
                value={recipientFormData.email}
                onChange={(e) => handleInputChange(e, "recipient")}
              />

              <div className="d-flex justify-content-between">
                <div className="py-2">
                  <div className="d-block">
                    <div>
                      <label>
                        <span className="fw-semibold text-black">TAX ID</span>{" "}
                        (vat, eori, ioss, pan, etc)
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="tax"
                        placeholder="Vat:123456789"
                        className=" rounded"
                        value={recipientFormData.tax}
                        onChange={(e) => handleInputChange(e, "recipient")}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 ">
                  <button
                    className="rounded bg-warning"
                    onClick={handleSaveAddressr}
                  >
                    Save the Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mb-5">
          <button className="btn btn-success px-5" onClick={handleSubmitForm}>
            Save & Next
          </button>
        </div>
      </>
      {currentStep > 1 && <Package {...{control,handleSubmit,register,fields, append, remove ,onSubmit}}/>}
   <div className="d-flex justify-content-center align-items-center" style={{padding:"20px"}}>
   <button type="submit" className=" btn bg-primary text-white rounded-pill"> Calculate Shipping Rates</button>
   </div>
      {
        rate && <FedexRates/>
      }
      
     
   
    </form>
  );
};

export default OrderForm;
