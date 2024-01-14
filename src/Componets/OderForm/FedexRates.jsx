import React from "react";
import photos from "../../Assets";
import { FaSortAmountDown } from "react-icons/fa";
import { MdKeyboardArrowRight,MdDeleteForever } from "react-icons/md";
import Table from "react-bootstrap/esm/Table";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import Customs from "./Customs";
import './FedexRates.css'
const FedexRates = () => {

    const [naviget,setNavigate]=useState(true);
  return (
    
      <div
        className="fedexratesM"
        style={{ width: "90%", margin: "auto", height: "auto" }}
      >
        {/* <div
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
        </div> */}
        
        {/**this is for Customs Declaration*/}

        <div className="declaration">
        <div style={{textAlign:"start",margin:"30px 0px 20px 0px"}}>
        <MdKeyboardArrowRight style={{marginRight:"10px",textAlign:"start"}}/> 
        <h6 style={{display:"inline",marginBottom:"30px",textAlign:"start"}}>Customs Declaration</h6>
        </div>
        <form style={{textAlign:"start",marginLeft:"60px"}}>
            <label htmlFor="cus" style={{marginRight:"10px"}}>Select Contents</label>
            <select style={{width:"60%",height:"35px",border:"2px solid #3ab1c8",borderRadius:"5px",placeholder:"Merchandise"}}>
                <option>Documents</option>
                <option>Gift</option>
                <option>Sample</option>
            </select>
        </form><br/>
        {/* <Table >
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
                    <td><input type="text" className="ratesInput"/></td>
                    <td><input type="number" className="ratesInput"/></td>
                    <td>$<input type="number" className="ratesInput"/></td>
                    <td>$<input type="number" className="ratesInput"/></td>
                    <td><input type="text" className="ratesInput"/></td>
                    <td><select style={{height:"31px",width:"135px"}}>
                        <option>United States</option>
                    </select></td>
                    <td><MdDeleteForever style={{width:"35px",height:"20px"}}/></td>
                </tr>
                   {naviget &&(
                    <Customs/>
                   )}
            </tbody>
        </Table> */}
          {/*fedex rates field */}
           <div className="fedex-rates-div"> 
           <div className="feddiv">
            <IoIosSearch style={{width:"47px",height:"25"}}/>
           </div>
           <div className="feddiv">
            <h6>Item Description</h6>
            <input type="text" />
           </div>
           <div className="feddiv"><h6>Qty</h6>
           <input type="number"/></div>
           <div className="feddiv"><h6>Value<smal>(each)</smal></h6>
           <input type="number"/></div>
           <div className="feddiv"><h6>Total Value</h6>
           <input type="number"/></div>
           <div className="feddiv"><h6>HS Code</h6>
           <input type="number"/></div>
           <div className="feddiv"><h6>Country of Origin</h6>
           <select style={{width:"12rem",height:"30px"}}>
            <option>United States</option>
           </select></div>
           <div className="feddiv"><h6>Delete</h6>
           <MdDeleteForever style={{width:"46px",height:"25"}}/></div>
           </div><hr/>
          
           {/*fedex rates field */}
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"0px"}}>
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
