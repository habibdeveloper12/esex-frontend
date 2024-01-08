import React from 'react';
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
    const navigate = useNavigate()
  return (
<div>
<div className=' pt-2 px-5 mx-5 me-3 center mt-4 pt-2 '>
<div className="privacy-policy text-black fw-semibold bg-light mt-5 pt-5 pb-5">
      <h2>Privacy Policy</h2>
      <p>We at easyex.com take your privacy seriously. This Privacy Policy outlines our practices regarding the collection, use, and protection of your personal information when using our platform.</p>

      <h3>Information Collection:</h3>
      <p>We collect personal information such as name, address, email address, and payment details for the purpose of creating shipping labels and processing payments.</p>

      <h3>Information Use:</h3>
      <p>We use your personal information solely for the purpose of providing our shipping platform services, including creating shipping labels and processing payments. We do not sell, trade, or otherwise transfer your personal information to any third parties for marketing purposes.</p>

      <h3>Data Protection:</h3>
      <p>We take appropriate measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We store your personal information on secure servers and use encryption to transmit sensitive information.</p>

      <h3>Information Retention:</h3>
      <p>We retain your personal information for as long as necessary to provide our shipping platform services and for compliance with legal and regulatory requirements.</p>

      <h3>Updates to this Policy:</h3>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. Your continued use of our platform after any modifications indicates your acceptance of the updated Privacy Policy.</p>

      <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:help@easyex.com">help@easyex.com</a>.</p>
    </div>
</div>
        <div className="footercolor text-white">
        <div className="container margin-pc">
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
                  <p className="text-white">Get Shipping Estimate</p>
                  <p className="text-white">Track Your Package</p>
                  <p className="text-white">Help Center</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-section">
                <h4 className="text-white">Contact</h4>
                <div className='mt-4'>
                  <p className="text-white">Contact Us</p>
                  <p className="text-white">646 504 8777</p>
                  <p className="text-white">help@easyex.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-section">
                <h4 className="text-white">Newsletter</h4>
                <p className="text-white mt-3">Be the first to learn about our great promotions!</p>
                <form>
                  <input className="text-white" placeholder='Subscribe' />
                </form>
              </div>
            </div>
          </div>
          <hr />
          {/* Additional section for copyright and links */}
          <div className="row">
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
</div>
  );
};

export default PrivacyPolicy;
