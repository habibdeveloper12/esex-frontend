import React from "react";
import { ImCross } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import "./OrderDetails.css";
import { useState } from "react";

import { MdContentCopy } from "react-icons/md";
import { LuPrinter } from "react-icons/lu";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { LuMinusCircle } from "react-icons/lu";
import { HiPlusCircle } from "react-icons/hi";
import { FaMinusCircle } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import TimeLine from "./timelineChild";
import { Controller, useForm } from "react-hook-form";
import GoogleSheet from "./GoogleSheet";
const OrderDetails = ({ order }) => {
  const [userNote, setUserNote] = useState("");
  const [csNote, setCsNote] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setopen2] = useState(false);
  const { handleSubmit, register, control } = useForm();
  function formatDate(originalDate) {
    const date = new Date(originalDate);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  const onSubmit = (data) => {
    console.log(csNote, userNote);
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="main">
        <header
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4>Order #: {order.orderId}</h4>
            <p>Date:{formatDate(order.createdAt)}</p>
          </div>
        </header>
        <hr />
        <div className="Detailspage">
          {/*This is for 2ndtop*/}
          <div className="top2nd">
            <div
              className="Kevin"
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100px",
                justifyContent: "space-between",
                height: "600px",
              }}
            >
              {/* <div style={{marginRight:"15px"}}><FaRegCircle/> </div> */}

              <div style={{ display: "block" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <div style={{ marginRight: "15px" }}>
                    <FaRegCircle style={{ width: "35px", height: "22px" }} />
                  </div>
                  <div>
                    <p>
                      {order.sender.name}
                      {open ? (
                        <LuMinusCircle
                          onClick={() => setOpen(!open)}
                          style={{ width: "30px", height: "20" }}
                        />
                      ) : (
                        <GoPlusCircle
                          onClick={() => setOpen(!open)}
                          style={{ width: "30px", height: "20" }}
                        />
                      )}
                    </p>
                    {open && (
                      <div style={{ lineHeight: "3px" }}>
                        <p style={{ color: "brown" }}>
                          Company: {order.sender.company}
                        </p>
                        <p style={{ color: "brown" }}>
                          Address: {order.sender.street1} {order.sender.state}{" "}
                          {order.sender.zip}
                        </p>
                      </div>
                    )}
                    <p>
                      {order.sender.street1} {order.sender.zip}
                    </p>
                    {open && (
                      <div style={{ lineHeight: "3px" }}>
                        <p style={{ color: "brown" }}>{order.sender.phone}</p>
                        <p style={{ color: "brown" }}>{order.sender.email}</p>
                        <p style={{ color: "brown" }}>
                          Tax ID: {order.sender.tax}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <div style={{ marginRight: "15px" }}>
                    <IoLocationSharp
                      style={{ width: "40px", height: "26px" }}
                    />
                  </div>
                  <div>
                    <p>
                      {order.recipient.name}
                      {open2 ? (
                        <FaMinusCircle
                          onClick={() => setopen2(!open2)}
                          style={{ width: "30px", height: "20" }}
                        />
                      ) : (
                        <HiPlusCircle
                          onClick={() => setopen2(!open2)}
                          style={{ width: "36px", height: "25" }}
                        />
                      )}
                    </p>
                    {open2 && (
                      <div style={{ lineHeight: "3px" }}>
                        <p style={{ color: "brown" }}>
                          Company: {order.recipient.name}
                        </p>
                        <p style={{ color: "brown" }}>
                          Address: Address: {order.recipient.street1}{" "}
                          {order.recipient.state} {order.recipient.zip}{" "}
                        </p>
                      </div>
                    )}
                    <p>
                      {" "}
                      {order.recipient.street1} {order.recipient.zip}
                    </p>
                    {open2 && (
                      <div style={{ lineHeight: "3px" }}>
                        <p style={{ color: "brown" }}>
                          {order.recipient.phone}
                        </p>
                        <p style={{ color: "brown" }}>
                          {order.recipient.email}
                        </p>
                        <p style={{ color: "brown" }}>
                          Tax ID: {order.recipient.tax}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              90008973248749 <MdContentCopy />
              <h6 style={{ marginTop: "7px" }}>Current Status:</h6>
              <small style={{ color: "#8bffff", marginTop: "5px" }}>
                Main Status : {order?.deliveryStatus}
              </small>
              <p style={{ color: "grey" }}>Detailed Status(if has)</p>
              <p style={{ color: "#005689" }}>View tracking history</p>
            </div>

            <div
              style={{
                width: "125px",
                height: "30px",
                border: "1px solid grey",
                display: "inline",
                borderRadius: "5px",
              }}
            >
              <LuPrinter style={{ marginRight: "4px", marginLeft: "5px" }} />
              <span>Print Label</span>
              <MdOutlineArrowDropDown />
            </div>
          </div>
          {/*This is for big green Line*/}

          <TimeLine />

          {/**This is for User Notes*/}
          <div className="Notes">
            <div>
              <label>User Note:</label>
              {order?.userNote}
              <br />
              <input
                onChange={(e) => setUserNote(e.target.value)}
                className="NotesInput"
                type="text"
                placeholder="You can add your internal notes for this order"
              />
            </div>
            <div>
              <label>Admin Note:</label>
              {order?.csNote}
              <br />
              <input
                onChange={(e) => setCsNote(e.target.value)}
                className="NotesInput"
                type="text"
                placeholder="Admin and CS team notes"
              />
            </div>
          </div>
          {/**this is for Shipment Details box*/}
          <div className="Shipment-Details">
            <div
              style={{
                width: "180px",
                height: "50px",
                border: "3px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Shipment Details</h5>
            </div>
            <hr />

            <div className="shipment-details-flex">
              <div className="1st-shipcomponent">
                <div className="shipment-singleCom">
                  <div>
                    <h6>Carrier</h6>
                    <p>FedEx</p>
                  </div>
                  <div>
                    <h6>Service</h6>
                    <p>FedEx International Priority</p>
                  </div>
                  <div>
                    <h6>Package Type</h6>
                    <p>FedEx Envelope</p>
                  </div>
                  <div>
                    <h6>Master Tracking #:</h6>
                    <p style={{ backgroundColor: "aqua" }}>7020200202</p>
                  </div>
                </div>
              </div>
              <div className="2nd-shipcomponent">
                <div className="shipment-singleCom">
                  <div>
                    <h6>Label Purchase Date</h6>
                    <p>12/12/2023 10AM</p>
                  </div>
                  <div>
                    <h6>Delivery Days</h6>
                    <p>2 days</p>
                  </div>
                  <div>
                    <h6>Delivery Date</h6>
                    <p>12/12/2023</p>
                  </div>
                  <div>
                    <h6>Guaranteed Delivery</h6>
                    <p>Yes</p>
                  </div>
                </div>
              </div>
              <div className="3rd-shipcomponent">
                <div className="shipment-singleCom">
                  <div>
                    <h6>Order Ref:</h6>
                    <p></p>
                  </div>
                  <div>
                    <h6>Insurance Coverage:</h6>
                    <p>$ 500</p>
                  </div>

                  <div>
                    <h6>Signature:</h6>
                    <p>Direct Signature</p>
                  </div>
                </div>
              </div>
            </div>

            {/*This is for Packages Info*/}
            <div className="Package-table" style={{ width: "90%" }}>
              <div className="package-heading">
                <h6>
                  Packages info
                  <small>(based on customer data entry)</small>
                </h6>
              </div>
              <table className="pakinfo">
                <thead
                  style={{
                    height: "30px",
                    width: "90%",
                    backgroundColor: "#a7bcb9",
                  }}
                >
                  <tr>
                    <th style={{ borderRight: "2px solid white" }}>Package</th>
                    <th style={{ borderRight: "2px solid white" }}>
                      Physicla Weight
                    </th>
                    <th style={{ borderRight: "2px solid white" }}>
                      Dimentions
                    </th>
                    <th style={{ borderRight: "2px solid white" }}>
                      Dim Factor &#10068;
                    </th>
                    <th style={{ borderRight: "2px solid white" }}>
                      Billed Weight ght &#10068;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1</td>
                    <td>3.5 lb</td>
                    <td>2 × 7 × 8 (inch)</td>
                    <td>166</td>
                    <td>4 lb</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div className="package-table-footer">
                <div>
                  <p>Total pieces:4</p>
                </div>
                <div>
                  <p>
                    Total Physical Weight : <b>9 lb 5 oz</b>
                  </p>
                </div>
                <div>
                  <p>Total Billed Weight &#10068; : 15 lb</p>
                </div>
              </div>
            </div>

            {/* Total cost*/}
            <div className="Total-paid">
              <div>
                <p>
                  Shipping Fee : <b>$38.6</b>($2.3/lb)
                </p>
              </div>
              <div>
                <p>
                  Insurance Fee : <b>$2.00</b>
                </p>
              </div>
              <hr />
              <div>
                <p>
                  Total Paid :<b>$40.6</b>
                </p>
              </div>
            </div>
            {/*This is for Shipping Fee Adjustment*/}
            <div className="ship-adust">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid black",
                  width: "200px",
                  height: "30px",
                }}
              >
                <h6>Shipping Fee Adjustment</h6>
              </div>
              <hr />
              <p style={{ width: "90%", marginBottom: "15px" }}>
                Carriers may request postage adjustment deu to Customer entering
                inaccurate shipment info including but not limited to incorrect
                weight..
              </p>
            </div>
            {/*This is for based on carrier's data*/}
            <div className="based-oncarrier">
              <h6 style={{ fontSize: "20px" }}>Based on carrier's data:</h6>
              <div className="based-child">
                <div>
                  <p style={{ gap: "15px", display: "inline" }}>
                    Final Physical Weight(lb):{" "}
                  </p>
                  <Controller
                    name="finalPhysicalWeight"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        style={{
                          width: "130px",
                          height: "25px",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  />
                  <button
                    className="btnalvi"
                    type="button"
                    onClick={() => console.log("Edit")}
                  >
                    Edit
                  </button>
                  <br />
                  <p style={{ gap: "15px", display: "inline" }}>
                    Final Billed Weight(lb):{" "}
                  </p>
                  <Controller
                    name="finalBilledWeight"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        style={{
                          width: "130px",
                          height: "25px",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  />
                  <button
                    className="btnalvi"
                    type="button"
                    onClick={() => console.log("Edit by admin")}
                  >
                    Edit by admin
                  </button>
                </div>
                <div>
                  <p style={{ gap: "15px", display: "inline" }}>
                    Accurate Shipping Fee:{" "}
                  </p>
                  <Controller
                    name="accurateShippingFee"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        style={{
                          width: "130px",
                          height: "25px",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  />
                  <button
                    className="btnalvi"
                    type="button"
                    onClick={() => console.log("Edit")}
                  >
                    Edit
                  </button>
                  <br />
                  <p style={{ gap: "15px", display: "inline" }}>Adjustment: </p>
                  <Controller
                    name="adjustment"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        style={{
                          width: "130px",
                          height: "25px",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  />
                  <button
                    className="btnalvi"
                    type="button"
                    onClick={() => console.log("Edit by admin")}
                  >
                    Edit by admin
                  </button>
                </div>
              </div>
            </div>
            {/*Admin Note*/}
            <div style={{ marginTop: "20px" }}>
              <input
                type="text"
                style={{ width: "80%", height: "40px", borderRadius: "5px" }}
                placeholder="Admin Note"
              />
            </div>

            <div className="custome-head">
              <div className="CHead">
                <h6>Customs Declaration</h6>
              </div>
              <div className="custome-head-flex">
                <div className="cu1st">
                  <b>Description</b>
                  <input
                    type="text"
                    className="Cuinput"
                    style={{ borderRadius: "5px", height: "30px" }}
                  />
                </div>
                <div className="cu2nd">
                  <b>Qty</b>
                  <input
                    type="number"
                    className="Cuinput"
                    style={{ borderRadius: "5px", height: "30px" }}
                  />
                </div>
                <div className="cu3nd"></div>
                <b>
                  Value<small>(each)</small>
                </b>
                <input
                  type="number"
                  className="Cuinput"
                  style={{ borderRadius: "5px", height: "30px" }}
                />
                <div className="cu4nd"></div>
                <b>Total value</b>
                <input
                  type="number"
                  className="Cuinput"
                  style={{ borderRadius: "5px", height: "30px" }}
                />
                <div className="cu5nd">
                  <b>HS Code</b>
                  <input
                    type="number"
                    className="Cuinput"
                    style={{ borderRadius: "5px", height: "30px" }}
                  />
                </div>
                <div className="cu6nd">
                  <b>Country of Origin</b>
                  <select
                    className="Cuinput"
                    style={{ borderRadius: "5px", height: "30px" }}
                  >
                    <option>United state</option>
                    <option>Bangladesh</option>
                  </select>
                </div>
              </div>
              {/*Customs Declaration table*/}

              <table className="custome-table">
                <thead style={{ backgroundColor: " #acdcee" }}>
                  <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>
                      Value<small>(each)</small>
                    </th>
                    <th>Total value</th>
                    <th>HS Code</th>
                    <th>Country of Origin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            style={{ height: "30px", width: "100%" }}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name="qty"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            style={{ height: "30px", width: "100%" }}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name="value"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            style={{ height: "30px", width: "100%" }}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name="totalValue"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            style={{ height: "30px", width: "100%" }}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name="hsCode"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            style={{ height: "30px", width: "100%" }}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name="countryOfOrigin"
                        control={control}
                        defaultValue="United States"
                        render={({ field }) => (
                          <select
                            {...field}
                            style={{ height: "30px", width: "100%" }}
                          >
                            <option value="United States">United States</option>
                            <option value="Bangladesh">Bangladesh</option>
                          </select>
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="custom-footer">
                <p>
                  Total Units: <b>10</b>
                </p>
                <p>
                  Total Value: <b>$120</b>
                </p>
              </div>
            </div>

            <div className="duty-main">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid black",
                  width: "120px",
                  height: "30px",
                }}
              >
                <h6>Duty & Taxes</h6>
              </div>
              <hr />
              <div className="duty_paragraph">
                <div>
                  <h6>Duty & Taxes by:</h6>
                  <p>
                    Recipient EasyEx(EasyEx won't know the exact amount if paid
                    by the receipient)
                  </p>
                </div>
                <div>
                  <h6>Amount:</h6>
                  <p>
                    $2.28 (Duty & Taxes fee will be posted to Customer's balance
                    upon receiving the carrier's invoice)
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <GoogleSheet />
            <div className="des123">
              <div>
                <p>Description 1:</p>
                <p>Description 2:</p>
                <p>Description 3:</p>
              </div>
              <div>
                <p>Charge Amount:</p>
                <p>Charge Amount:</p>
                <p>Charge Amount:</p>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary " type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default OrderDetails;
