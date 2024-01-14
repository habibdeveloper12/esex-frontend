import React, { useCallback, useMemo } from "react";
import photos from "../../Assets";
import { FaSortAmountDown } from "react-icons/fa";
import { MdKeyboardArrowRight, MdDeleteForever } from "react-icons/md";
import Table from "react-bootstrap/esm/Table";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import Customs from "./Customs";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { updateWallet } from "../../store/slices/walletSlice";
import { useAuthState } from "react-firebase-hooks/auth";
const FedexRates = ({ rate, selectedRate, setSelectedRate, orderId }) => {
  const [naviget, setNavigate] = useState(true);
  const [select, setSelect] = useState({});
  const { sender, recipient, addons, id } = useSelector((state) => state.form);
  const wallet = useSelector((state) => state.wallet);
  function convertDateFormat(apiDate) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const formattedDate = new Date(apiDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }
  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      selectedContent: "Documents",
      tax: "up-to-100",
      items: [
        {
          description: "",
          quantity: "",
          value: "",
          weight: 0,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  console.log(id);
  const [user] = useAuthState();
  const handleAddNewItem = () => {
    append({}); // Add a new empty item to the 'items' array
  };

  const handleDeleteItem = (index) => {
    remove(index); // Remove the item at the specified index
  };
  const totalValue = useMemo(() => {
    // Calculate the sum of values for each item
    return fields
      .reduce((sum, item) => sum + parseFloat(item.value) || 0, 0)
      .toFixed(2);
  }, [fields]);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log(parseInt(selectedRate.rate) > wallet);
    if (!selectedRate) {
      alert("Please select package  ");
    } else if (parseInt(selectedRate.rate) > wallet) {
      alert("Please add money on wallet ");
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:5001/api/v1/order/update-order/${id}`,
          {
            sender,
            recipient,
            addons,
            custom: data,
            shipment: selectedRate,
            orderId: id,
          }
        );
        const data = await axios.patch(
          `http://localhost:5001/api/v1/user/wallet`,
          {
            wallet: selectedRate.rate,
            email: user?.email,
          }
        );
        dispatch(updateWallet(wallet - parseFloat(selectedRate.rate)));
        console.log("Full response:", response);

        if (
          response.data.success !== undefined &&
          response.data.success === false
        ) {
          toast.error(`Error: ${response.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          console.log("df");
          toast.success("Order Place successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        console.error("Error saving address:", error.message);
        toast.error("An error occurred while saving the address.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }

    console.log(sender, recipient, addons);
    console.log(data);

    // Further processing or API calls can be added here
  };
  const handleSelect = useCallback((item) => {
    // setSelect(item);
    setSelectedRate(item);
  }, []);
  console.log(select);

  console.log(rate);
  return (
    <div
      className="fedexratesM"
      style={{ width: "90%", margin: "auto", height: "auto" }}
    >
      <div
        id="available-services"
        className="mt-4 table-responsive"
        style={{ scrollMarginTop: "100px" }}
      >
        <table className="table bg-light p-3">
          <thead className="bg-success text-white">
            <tr>
              <th scope="col">Estimated Delivery</th>
              <th scope="col">Services</th>
              <th scope="col">Package Type</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {rate.map((item) => (
              <tr style={{ border: "medium" }}>
                <td scope="row">
                  Overnight <br /> {convertDateFormat(item.created_at)}
                  <div>
                    {item.delivery_date_guaranteed && (
                      <span
                        className="bg-success mx-2 p-1 text-white rounded"
                        style={{ fontSize: "12px" }}
                      >
                        Guaranteed
                      </span>
                    )}
                    {/* <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="circle-question"
                    className="svg-inline--fa fa-circle-question me-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ cursor: "pointer", fontSize: "12px" }}
                  >
                    <path
                      fill="currentColor"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                    ></path>
                  </svg> */}
                  </div>
                </td>
                <td>
                  {item.carrier}
                  <br />
                  {item.service}
                  <br />
                </td>
                <td>
                  <span className="d-flex gap-2 align-items-center">
                    <img
                      alt="Package"
                      loading="lazy"
                      width="62"
                      height="44"
                      decoding="async"
                      data-nimg="1"
                      style={{ color: "transparent" }}
                      src="/packageTypes/FedExEnvelope.jpg"
                    />
                    <span className="text-capitalize">
                      {item.carrier} Envelope{" "}
                    </span>
                  </span>
                </td>
                <td className="align-items-center"> ${item.rate}</td>
                <td>
                  <button
                    onClick={() => handleSelect(item)}
                    type="button"
                    className="btn btn-primary text-white py-2 navbar-brand"
                  >
                    {selectedRate == item ? "Selected" : "Select"}
                  </button>
                </td>
              </tr>
            ))}
            {/* <tr onClick={() => setSelectedRate(rate)} style={{ border: "medium" }}>
              <td scope="row">
                Overnight <br /> Sat Jan 13, 2024, 02:31 PM
              </td>
              <td>
                FedEx
                <br />
                FedEx International Connect Plus
                <br />
              </td>
              <td>
                <span className="d-flex gap-2 align-items-center">
                  <img
                    alt="Package"
                    loading="lazy"
                    width="62"
                    height="44"
                    decoding="async"
                    data-nimg="1"
                    style={{ color: "transparent" }}
                    src={photos.Envlope}
                  />
                  <span className="text-capitalize"> your packaging</span>
                </span>
              </td>
              <td className="align-items-center">$40.72</td>
              <td>
                <button className="btn btn-primary py-2 navbar-brand">
                  Ship
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      {/**this is for Customs Declaration*/}

      <div className="declaration">
        <div style={{ textAlign: "start", margin: "30px 0px 20px 0px" }}>
          <MdKeyboardArrowRight
            style={{ marginRight: "10px", textAlign: "start" }}
          />
          <h6
            style={{
              display: "inline",
              marginBottom: "30px",
              textAlign: "start",
            }}
          >
            Customs Declaration
          </h6>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ textAlign: "start", marginLeft: "60px" }}
        >
          <label htmlFor="cus" style={{ marginRight: "10px" }}>
            Select Contents
          </label>
          <div className="mt-2">
            <select
              {...register("selectedContent")}
              style={{
                width: "400px",
                height: "35px",
                border: "2px solid #3ab1c8",
                borderRadius: "5px",
              }}
            >
              <option value="Documents">Documents</option>
              <option value="Gift">Gift</option>
              <option value="Sample">Sample</option>
            </select>
          </div>

          <br />

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead
              style={{
                border: "1px solid #3ab1c8",
                backgroundColor: "#d9f2ff",
              }}
            >
              <tr>
                <th colSpan={2} style={{ width: "25%" }}>
                  Description
                </th>
                <th style={{ width: "10%" }}>Qty</th>
                <th style={{ width: "10%" }}>Value</th>
                <th style={{ width: "10%" }}>weight</th>

                <th style={{ width: "10%" }}>Delete</th>
              </tr>
            </thead>

            <tbody>
              {fields.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ width: "20%" }}>
                    <input
                      {...register(`items[${index}].description`)}
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </td>

                  <td style={{ width: "20%" }}>
                    <input
                      {...register(`items[${index}].quantity`)}
                      type="number"
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td style={{ width: "20%" }}>
                    $
                    <input
                      {...register(`items[${index}].value`)}
                      type="number"
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td style={{ width: "20%" }}>
                    $
                    <input
                      {...register(`items[${index}].weight`)}
                      type="number"
                      style={{ width: "100%" }}
                    />
                  </td>

                  <td style={{ width: "5%" }}>
                    <MdDeleteForever
                      style={{
                        width: "35px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => remove(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add new item button */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "#3ab1c8",
                fontFamily: "inherit",
                fontSize: "15px",
                display: "inline",
                cursor: "pointer",
              }}
              onClick={handleAddNewItem}
            >
              + Add New Item
            </div>
            <div>
              Total Units:<b>{fields.length}</b>
            </div>
            <div>
              {/* Calculate total values here based on your data */}
              Total Values: <b>${totalValue}</b>
            </div>
          </div>
          <div className=" d-flex justify-content-between align-middle">
            <div
              className="mt-9"
              style={{ textAlign: "start", margin: "30px 0px 20px 0px" }}
            >
              <MdKeyboardArrowRight
                style={{ marginRight: "10px", textAlign: "start" }}
              />
              <h6
                className="mn-2"
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginBottom: "30px",
                  textAlign: "start",
                }}
              >
                Reference & Tax
              </h6>
              <br />
              <select
                {...register("tax")}
                style={{
                  width: "400px",
                  height: "35px",
                  border: "2px solid #3ab1c8",
                  borderRadius: "5px",
                }}
              >
                <option value="up-to-100">Up to $100</option>
                <option value="up-to-200">Up to $200</option>
                <option value="up-to-300">Up to $500</option>
              </select>
            </div>
            <div
              style={{ textAlign: "start", margin: "30px 0px 20px 0px" }}
              className=""
            >
              <div className="d-flex justify-content-left align-items-center  ">
                <img
                  alt="Package"
                  loading="lazy"
                  width="80"
                  height="60"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src={photos.fedexLogo}
                />
                <div>
                  <h4 className="bold fw-bold"> ${selectedRate.rate}</h4>
                  <hr />
                  <h6>Shipping: {selectedRate.rate} </h6>
                  <h6> Insurence: $2 </h6>
                </div>
              </div>
              <div>
                <button
                  style={{ width: "100%" }}
                  type="submit"
                  className="btn btn-primary w-full mt-10 text-white"
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FedexRates;
