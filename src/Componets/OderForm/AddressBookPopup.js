import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const AddressBookPopup = ({ onClose }) => {
  const [addresses, setAddresses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [defaultAddressId, setDefaultAddressId] = useState("");
  const [user] = useAuthState(auth);

  const handleDeleteAddress = async (id) => {
    try {
      console.log(id);
      await axios.delete(
        `http://localhost:5000/api/v1/user/addressDelete/${id}`
      );
      await fetchAddresses();
      toast.success("Address deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(`Error deleting address: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Error deleting address:", error);
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      // Send a request to set the address as default
      await axios.put(
        `http://localhost:5000/api/v1/user/setDefaultAddress/${id}`
      );
      setDefaultAddressId(id);
      toast.success("Address set as default successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(`Error setting default address: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Error setting default address:", error);
    }
  };

  const userEmail = user?.email;
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/user/addressAll?nickname=${searchTerm}&&email=${userEmail}`
      );

      setAddresses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  const fetchDefaultAddress = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/user/peruser?email=${user?.email}`
      );

      setDefaultAddressId(response.data.defaultAddress);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchDefaultAddress();
  }, [searchTerm]);

  const filteredAddresses = addresses.filter((address) =>
    address.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredAddresses, defaultAddressId);
  return (
    <div className="address-book-popup ">
      <div className="popup-container">
        <div className="popup mt-5">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2 className="text-center">Sender Address Book</h2>
          <input
            type="text"
            placeholder="Search by nickname"
            className="form-inpu search-input "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredAddresses.map((address) => (
              <li key={address.nickname} className="d-flex">
                <div>
                  <hr />
                  <div className="d-flex">
                    <div className="mx-3 popuppaddingpc">
                      <h5 className="fw-semibold text-primary">
                        {address.nickname}
                      </h5>
                      {defaultAddressId == address._id ? (
                        <button
                          className="text-white me-5 fs-6 bg-success rounded"
                          disabled
                        >
                          Default
                        </button>
                      ) : (
                        <button
                          className="text-white fs-6 bg-secondary rounded"
                          onClick={() => handleSetDefaultAddress(address._id)}
                        >
                          Set to default
                        </button>
                      )}
                    </div>
                    <div>
                      {address.sender && (
                        <div className="d-flex align-items-center">
                          <div>
                            <h5 className="text-black">
                              {address.sender.name}
                            </h5>
                          </div>
                          <div className="mx-2 pb-1">
                            <FaEllipsisV size={17} />
                          </div>
                          <div>
                            <h5>{address.sender.company}</h5>
                          </div>
                        </div>
                      )}
                      <div>
                        <h6 className="gap-3">
                          {address.sender && (
                            <>
                              {address.sender.street1}, {address.sender.street2}{" "}
                              ,{address.sender.city} , {address.sender.state} ,{" "}
                              {address.sender.zip} ,{address.sender.country}{" "}
                              <br />
                              <span>
                                {address.sender.phone}, {address.sender.email}
                              </span>
                            </>
                          )}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="ms-auto">
                  <hr />
                  <span onClick={() => handleDeleteAddress(address._id)}>
                    <BsTrash />
                  </span>
                  <hr />
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddressBookPopup;
