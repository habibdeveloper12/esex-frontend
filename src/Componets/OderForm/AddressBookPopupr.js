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
  const [user] = useAuthState(auth);
  const handleDeleteAddress = async (id) => {
    try {
      console.log(id);
      await axios.delete(
        `http://localhost:5001/api/v1/user/addressrDelete/${id}`
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

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/v1/user/addressrAll?nickname=${searchTerm}&&email=${user?.email}`
      );

      setAddresses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [searchTerm]);
  const filteredAddresses = addresses.filter((address) =>
    address.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="address-book-popup ">
      <div className="popup-container">
        <div className="popup mt-5">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2 className="text-center">Recipient Address Book</h2>
          <input
            type="text"
            placeholder="Search by nickname"
            className="form-inpu rounded-pill bglight"
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
                      <h5>recipent nickname</h5>
                      <h5 className="fw-semibold text-primary">
                        {address.nickname}
                      </h5>
                    </div>
                    <div>
                      {/* Check if address.sender exists before accessing its properties */}
                      {address.recipient && (
                        <div className="d-flex align-items-center">
                          <div>
                            <h5 className="text-black">
                              {address.recipient.name}
                            </h5>
                          </div>
                          <div className="mx-2 pb-1">
                            <FaEllipsisV size={17} />
                          </div>
                          <div>
                            <h5>{address.recipient.company}</h5>
                          </div>
                        </div>
                      )}
                      <div>
                        <h6 className="gap-3">
                          {/* Check if address.sender exists before accessing its properties */}
                          {address.recipient && (
                            <>
                              {address.recipient.street1},{" "}
                              {address.recipient.street2} ,
                              {address.recipient.city} ,{" "}
                              {address.recipient.state} ,{" "}
                              {address.recipient.zip} ,
                              {address.recipient.country} <br />
                              <span>
                                {address.recipient.phone},{" "}
                                {address.recipient.email}
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
