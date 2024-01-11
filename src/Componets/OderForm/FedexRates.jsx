import React from "react";
import photos from "../../Assets";
import { FaSortAmountDown } from "react-icons/fa";
import { MdKeyboardArrowRight,MdDeleteForever } from "react-icons/md";
import Table from "react-bootstrap/esm/Table";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import Customs from "./Customs";
const FedexRates = () => {

    const [naviget,setNavigate]=useState(true);
  return (
    
      <div
        className="fedexratesM"
        style={{ width: "90%", margin: "auto", height: "auto" }}
      >
        <div
          className="heading"
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "70px",
            gap: "230px",
          }}
        >
          <h6>Service</h6>
          <div>
            <h6 style={{marginLeft:"15px"}}>
              Delivery
              <FaSortAmountDown style={{marginLeft:"6px"}}/>
              <small style={{marginLeft:"6px"}}>(Ship By Today)</small>
            </h6>
          </div>
          <h6>Package Type</h6>
        </div>
        <div
          className="fedexrates"
          style={{
            margin: "auto",
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            height: "200px",
            border: "1px solid #00bbf0",
            padding: "13px 13px 0px 13px",
            borderRadius: "15px",
          }}
        >
          <div className="fedexlogo" style={{ flexGrow: "1" }}>
            <img
              src={photos.fedexLogo}
              alt="fedexlogo"
              style={{ width: "50px", height: "15px",textAlign:"start"}}
            />
            <p>Fedex Priority Overnight</p>
          </div>
          <div className="daycount" style={{ flexGrow: "1" }}>
            <h6>1 Day</h6>
            <p>Wed 07/27 by 11.00 am</p>
            <button
              style={{
                backgroundColor: "#42b883",
                borderRadius: "20px",
                fontSize: "13px",
                fontFamily: "inherit",
                border: "none",
                color: "white",
              }}
            >
              Money-Back Guarantee
            </button>
            &#10068;
          </div>
          <div className="sign" style={{ flexGrow: "1" }}>
            <button
              style={{
                borderRadius: "15px",
                padding: "4px 19px 4px 19px",
                fontSize: "15px",
                border: "1px solid grey",
                backgroundColor: "white",
              }}
            >
              Add Signature
            </button>
          </div>
          <div
            className="packageType"
            style={{ display: "flex", flexDirection: "column", flexGrow: "2" }}
          >
            <div
              className="1st"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "auto",
                marginBottom: "5px",
              }}
            >
              <img
                src={photos.Envlope}
                alt="Envlope"
                style={{ width: "70", height: "50px" }}
              />
              <p>Fedex Envlope &#10068;</p>
              $40.14
            </div>
            <div
              className="2nd"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "auto",
                marginBottom: "5px",
              }}
            >
              <img
                src={photos.Envlope}
                alt="Envlope"
                style={{ width: "70", height: "50px" }}
              />
              <p>Fedex Pak &#10068;</p>$38.81
            </div>
            <div
              className="3rd"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "auto",
                marginBottom: "5px",
              }}
            >
              <img
                src={photos.Box}
                alt="Envlope"
                style={{ width: "70", height: "50px" }}
              />
              <p>Package &#10068;</p>
              $43.25
            </div>
          </div>
        </div>

        {/**this is for Customs Declaration*/}

        <div className="declaration">
        <div style={{textAlign:"start",margin:"30px 0px 20px 0px"}}>
        <MdKeyboardArrowRight style={{marginRight:"10px",textAlign:"start"}}/> 
        <h6 style={{display:"inline",marginBottom:"30px",textAlign:"start"}}>Customs Declaration</h6>
        </div>
        <form style={{textAlign:"start",marginLeft:"60px"}}>
            <label htmlFor="cus" style={{marginRight:"10px"}}>Select Contents</label>
            <select style={{width:"400px",height:"35px",border:"2px solid #3ab1c8",borderRadius:"5px",placeholder:"Merchandise"}}>
                <option>Documents</option>
                <option>Gift</option>
                <option>Sample</option>
            </select>
        </form><br/>
        <Table >
            <thead style={{border:"1px solid #3ab1c8",backgroundColor:"#d9f2ff"}}>
                <tr>
                    <th colSpan={2}>Item Description</th>
                    <th>Qty</th>
                    <th>Value<small>(each)</small></th>
                    <th>Total Value</th>
                    <th>HS Code</th>
                    <th>Country of Origin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><IoIosSearch/></td>
                    <td><input type="text"/></td>
                    <td><input type="number"/></td>
                    <td>$<input type="number"/></td>
                    <td>$<input type="number"/></td>
                    <td><input type="text"/></td>
                    <td><select style={{height:"31px",width:"135px"}}>
                        <option>United States</option>
                    </select></td>
                    <td><MdDeleteForever style={{width:"35px",height:"20px"}}/></td>
                </tr>
                   {naviget &&(
                    <Customs/>
                   )}
            </tbody>
        </Table>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <div style={{color:"#3ab1c8",fontFamily:"inherit",fontSize:"15px",display:"inline"}}
         onClick={()=>setNavigate(!naviget)}>
        + Add New Item
        </div>
        <div>Total Units:<b>10</b></div>
        <div>Total Values: <b>$120</b></div>
        </div>

        </div>
      </div>
  )
}

export default FedexRates;
