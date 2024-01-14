import React from 'react'
import { ImCross } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import './OrderDetails.css'
import { useState } from 'react';

import { MdContentCopy } from "react-icons/md";
import { LuPrinter } from "react-icons/lu";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { LuMinusCircle } from "react-icons/lu";
import { HiPlusCircle } from "react-icons/hi";
import { FaMinusCircle } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import TimeLine from './TimeLine';
const OrderDetails = () => {

    const [open,setOpen]=useState(false);
    const [open2,setopen2]=useState(false);

  return (
    <div className='main'>
      <header style={{display:"flex",flexDirection:"row",
      justifyContent:"space-between"}}> 
       <div><h4>Order #: kjsdhj</h4>
       <p>Date: 08/08/2023</p></div>
       <div style={{width:"40px",height:"28px"}}><ImCross/></div>
      </header><hr/>
      <div className='Detailspage' >
      {/*This is for 2ndtop*/}
      <div className='top2nd'>

      <div className='Kevin' style={{display:"flex",flexDirection:"row"
      ,width:"100px",justifyContent:"space-between",height:"600px"}}>
      {/* <div style={{marginRight:"15px"}}><FaRegCircle/> </div> */}

      <div style={{display:"block"}}>
      <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
      <div  style={{marginRight:"15px"}}><FaRegCircle style={{width:"35px",height:"22px"}}/></div>
      <div><p>Kevin Barry {open ? <LuMinusCircle onClick={()=>setOpen(!open)}  style={{width:"30px",height:"20"}}/>: 
      <GoPlusCircle onClick={()=>setOpen(!open)} style={{width:"30px",height:"20"}}/>}</p>
      {open && (
       <div style={{lineHeight:"3px"}}>
       <p style={{color:"brown"}}>Company</p>
       <p style={{color:"brown"}}>Address</p>
       </div>
      )}
      <p>POUGHKEEPSIE,NY 12601 US</p>
      {open &&(
        <div style={{lineHeight:"3px"}}>
          <p style={{color:"brown"}}>Phone:</p>
          <p style={{color:"brown"}}>Email:</p>
          <p style={{color:"brown"}}>Tax ID:</p>
        </div>
      )}
       
      </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
      <div  style={{marginRight:"15px"}}><IoLocationSharp style={{width:"40px",height:"26px"}}/></div>
      <div><p>Muton Alies {open2 ? <FaMinusCircle onClick={()=>setopen2(!open2)}  style={{width:"30px",height:"20"}}/>: 
      <HiPlusCircle onClick={()=>setopen2(!open2)} style={{width:"36px",height:"25"}}/>}</p>
      {open2 && (
       <div style={{lineHeight:"3px"}}>
       <p style={{color:"brown"}} >Company</p>
       <p style={{color:"brown"}}>Address</p>
       </div>
      )}
      <p>Rayer Bazar,Dhaka,1209</p>
      {open2 &&(
        <div style={{lineHeight:"3px"}}>
          <p style={{color:"brown"}}>Phone:</p>
          <p style={{color:"brown"}}>Email:</p>
          <p style={{color:"brown"}}>Tax ID:</p>
        </div>
      )}
       
      </div>
      </div>
      </div>
      </div>


      <div>90008973248749 <MdContentCopy/>
       <h6 style={{marginTop:"7px"}}>Current Status:</h6>
       <small style={{color:"#8bffff",marginTop:"5px"}}>Main Status</small>
       <p style={{color:"grey"}}>Detailed Status(if has)</p>
       <p style={{color:"#005689"}}>View tracking history</p>
      </div>

       <div style={{width:"125px",height:"30px",border:"1px solid grey",display:"inline"
       ,borderRadius:"5px",}}>
         <LuPrinter style={{marginRight:"4px",marginLeft:"5px"}}/><span>Print Label</span><MdOutlineArrowDropDown/>
       </div>
        
      </div>
        {/*This is for big green Line*/}
      
      <TimeLine/>
      
       {/**This is for User Notes*/}
        <div className='Notes'>
          <div><label>User Note:</label><br/>
          <input className='NotesInput' type="text"  placeholder='You can add your internal notes for this order'/></div>
          <div><label>CS Note:</label><br/>
          <input className='NotesInput' type='text'  placeholder='Admin and CS team notes'/></div>
        </div>
        {/**this is for Shipment Details box*/}
        <div className='Shipment-Details'>
         <div style={{width:"180px",height:"50px",
         border:"3px solid black",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <h5>Shipment Details</h5>
         </div><hr/>

         <div className='shipment-details-flex'>
          <div className='1st-shipcomponent'>
            <div className='shipment-singleCom'>
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
              <p style={{backgroundColor:"aqua"}}>7020200202</p>
              </div>
            </div>
          </div>
          <div className='2nd-shipcomponent'>
          <div className='shipment-singleCom'>
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
          <div className='3rd-shipcomponent'>
          <div className='shipment-singleCom'>
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
         <div className='Package-table' style={{width:"90%"}}>
         <div className='package-heading'><h6>Packages info
          <small>(based on customer data entry)</small></h6>
          </div>
           <table  className='pakinfo'>
            <thead style={{height:"30px",width:"90%",backgroundColor:"#a7bcb9"}}>
              <tr>
                <th style={{borderRight:"2px solid white"}}>Package</th>
                <th style={{borderRight:"2px solid white"}}>Physicla Weight</th>
                <th style={{borderRight:"2px solid white"}}>Dimentions</th>
                <th style={{borderRight:"2px solid white"}}>Dim Factor &#10068;</th>
                <th style={{borderRight:"2px solid white"}}>Billed Weight ght &#10068;</th>
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
           </table><hr/>
           <div className='package-table-footer' >
            <div><p>Total pieces:4</p></div>
            <div><p>Total Physical Weight : <b>9 lb 5 oz</b></p></div>
            <div><p>Total Billed Weight &#10068; : 15 lb</p></div>
           </div>
         </div>
           
           {/* Total cost*/}
           <div className='Total-paid'>
            <div><p>Shipping Fee :   <b>$38.6</b>($2.3/lb)</p></div>
            <div><p>Insurance Fee :    <b>$2.00</b></p></div><hr/>
            <div><p>Total Paid       :<b>$40.6</b></p></div>
           </div>
           {/*This is for Shipping Fee Adjustment*/}
           <div className='ship-adust'>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",
            border:"2px solid black",width:"200px",height:"30px"}}>
            <h6>Shipping Fee Adjustment</h6></div><hr/>
            <p style={{width:"90%",marginBottom:"15px"}}>Carriers may request postage adjustment deu to Customer entering inaccurate shipment info including
            but not limited to incorrect weight..</p>    
           </div>
            {/*This is for based on carrier's data*/}
            <div className='based-oncarrier'>
            <h6 style={{fontSize:"20px"}}>Based on carrier's data:</h6>
            <div className='based-child'>
           <div>
            <p style={{gap:"15px",display:"inline"}}>Final Phisical Weight(lb): </p><input type='text' style={{width:"130px",height:"25px",borderRadius:"5px"}}/><button className='btnalvi'>Edit</button>
            <p style={{gap:"15px",display:"inline"}}>Final Billed Weight(lb): </p><input type='text' style={{width:"130px",height:"25px",borderRadius:"5px"}}/><button className='btnalvi'>Edit by admin</button>
           </div>
           <div>
            <p style={{gap:"15px",display:"inline"}}>Accurate Shipping Fee: </p><input type='text' style={{width:"130px",height:"25px",borderRadius:"5px"}}/><button className='btnalvi'>Edit</button>
            <p style={{gap:"15px",display:"inline"}}>Adjustment: </p><input type='text' style={{width:"130px",height:"25px",borderRadius:"5px"}}/><button className='btnalvi'>Edit By admin</button>
           </div>
            </div>
            </div>
             {/*Admin Note*/}
             <div style={{marginTop:"20px"}}>
              <input type='text' style={{width:"80%",height:"40px",borderRadius:"5px"}} placeholder='Admin Note'/>
             </div>

             {/*Custome Declaration*/}
             <div className='custome-head'>
             <div className='CHead'>
             <h6>Customs Declaration</h6></div>
             <div className='custome-head-flex'>
               <div className='cu1st'>
                <b>Description</b>
                <input type='text' className='Cuinput' style={{borderRadius:"5px",height:"30px"}}/>
               </div>
               <div className='cu2nd'>
               <b>Qty</b>
                <input type='number'  className='Cuinput' style={{borderRadius:"5px",height:"30px"}}/>
               </div>
               <div className='cu3nd'></div>
               <b>Value<small>(each)</small></b>
                <input type='number'  className='Cuinput' style={{borderRadius:"5px",height:"30px"}}/>
               <div className='cu4nd'></div>
               <b>Total value</b>
                <input type='number'  className='Cuinput' style={{borderRadius:"5px",height:"30px"}}/>
               <div className='cu5nd'>
               <b>HS Code</b>
                <input type='number'  className='Cuinput' style={{borderRadius:"5px",height:"30px"}}/>
               </div>
               <div className='cu6nd'>
               <b>Country of Origin</b>
                <select  className='Cuinput' style={{borderRadius:"5px",height:"30px"}}>
                  <option>United state</option>
                  <option>Bangladesh</option>
                </select>
               </div>
             </div>
             {/*Customs Declaration table*/}
             <table className='custome-table'>
              <thead style={{backgroundColor:" #acdcee"}}>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Value<small>(each)</small></th>
                  <th>Total value</th>
                  <th>HS Code</th>
                  <th>Country of Origin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type='text'  style={{height:"30px",width:"100%"}}/></td>
                  <td><input type='number'  style={{height:"30px",width:"100%"}}/></td>
                  <td><input type='number'  style={{height:"30px",width:"100%"}}/></td>
                  <td><input type='number'  style={{height:"30px",width:"100%"}}/></td>
                  <td><input type='number'  style={{height:"30px",width:"100%"}}/></td>
                  <td><select   style={{height:"30px",width:"100%"}}>
                  <option>United state</option>
                  <option>Bangladesh</option>
                </select></td>
                </tr>
              </tbody>
             </table>
             <div className='custom-footer'>
              <p>Total Units: <b>10</b></p>
              <p>Total Value: <b>$120</b></p>
             </div>
             </div>
             {/*Duty & Taxes*/}
             <div className='duty-main'>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",
              border:"2px solid black",width:"120px",height:"30px"}}><h6>Duty & Taxes</h6>
              </div><hr/>
              <div className='duty_paragraph'>
                <div>
                  <h6>Duty & Taxes by:</h6>
                  <p>Recipient EasyEx(EasyEx won't know the exact amount if paid by the receipient)</p>
                  
                </div> 
                <div>
                <h6>Amount:</h6>
                <p>$2.28 (Duty & Taxes fee will be posted to Customer's balance upon receiving the carrier's invoice)</p>
                </div>
              </div>
             </div><hr/>
             {/*This is for Description 123*/}
             <div className='des123'>
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
    </div>
  )
}

export default OrderDetails