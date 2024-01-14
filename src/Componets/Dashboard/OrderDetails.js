import React from "react";

const OrderDetailsA = ({ order }) => {
  return (
    <div>
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title h4">
            <h2>Details</h2>
          </div>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6 text-capitalize">
              <h4>Sender</h4>
              <div>
                <p>
                  <span class="fw-bold">Name</span>: {order.sender.name}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Company</span>: {order.sender.company}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Country</span>: {order.sender.country}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Address: </span>
                  {order.sender.street1}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">City</span>: {order.sender.city}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">State</span>: {order.sender.state}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Zipcode</span>: {order.sender.zip}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Phone</span>: {order.sender.phone}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Email</span>:{order.sender.email}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Protection</span>: Up to $100 insurance
                  by carrier
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Description</span>: N/A
                </p>
              </div>
            </div>
            <div class="col-6 text-capitalize">
              <h4>Recipient</h4>
              <div>
                <p>
                  <span class="fw-bold">Name</span>: {order.recipient.name}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Company</span>:{" "}
                  {order.recipient.company}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Country</span>:{order.recipient.country}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Address: </span>{" "}
                  {order.recipient.street1}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">City</span>: {order.recipient.city}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">State</span>:{order.recipient.state}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Zipcode</span>: {order.recipient.zip}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Phone</span>: {order.recipient.phone}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Email</span>: {order.recipient.email}
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Signature</span>: none
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Status</span>: PENDING
                </p>
              </div>
              <div>
                <p>
                  <span class="fw-bold">Track</span>: <span>N/A</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsA;
