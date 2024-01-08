import React from 'react';
import { useNavigate } from "react-router-dom";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { GrSearch } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { BiPhoneCall } from "react-icons/bi";
import { RiContactsBookFill } from "react-icons/ri";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className="footercolor text-white">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="footer-section">
              <h4 className="text-white">About Us</h4>
              <div className='mt-4'>
                <p className="text-white">About Esayex</p>
                <p className="text-white">Our Advantages</p>
                <p className="text-white">Our Overseas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="footer-section">
              <h4 className="text-white">Tools</h4>
              <div className='mt-4'>
                <p className="text-white"><TbDeviceLandlinePhone /><span className='ms-1'>Get Shipping Estimate</span></p>
                <p className="text-white"><GrSearch /><span className='ms-1'>Track Your Package</span></p>
                <p className="text-white"><BiSupport /><span className='ms-1'>Help Center</span></p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="footer-section">
              <h4 className="text-white">Contact</h4>
              <div className='mt-4'>
                <p className="text-white"><RiContactsBookFill /><span className='ms-1'>Contact Us</span></p>
                <p className="text-white"><BiPhoneCall /><span className='ms-1'>xxxx4555555</span></p>
                <p className="text-white" > <BiSupport /><span className='ms-1'>help@Easyex.com</span></p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
      <div className="footer-section">
        <h4 className="text-white">Newsletter</h4>
        <p className="text-white mt-3">Stay informed about our latest promotions and updates!</p>
        <form className="mt-3">
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              placeholder="Your Email Address"
              aria-label="Your Email Address"
              aria-describedby="basic-addon2"
            />
            <button className="btn btn-warning" type="button" id="basic-addon2">
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
              <div>
                Copyright © 2023 EASYEX
              </div>
              <div className="d-flex">
              <span onClick={() => navigate("/terms")} className=" pointerb d-block text-white">Terms & Condition</span>
              <span onClick={() => navigate("/priv")} className="pointerb d-block text-white ms-3">Privacy Statement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
