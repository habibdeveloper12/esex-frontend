import React, { useState } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import { convertYearString, dates, timelineBCFormat } from "./constants";
import "./timeline.css";
const VALUES = ["delivery", "inTransit"];

const Timeline = ({ order }) => {
  const [state, setState] = useState({
    value: 0,
    previous: 0,
  });
  const status = ["delivered", "out-delivery", "in-transit", "out-transit"];
  return (
    <div>
      {/* Bounding box for the Timeline */}
      <div class="mt-[-30px]" style={{ marginTop: "-20px" }}>
        <div class="row">
          <div class="col">
            <div class="timeline-steps aos-init aos-animate" data-aos="fade-up">
              <div class="timeline-step">
                <div
                  class="timeline-content"
                  data-toggle="popover"
                  data-trigger="hover"
                  data-placement="top"
                  title=""
                  data-content="And here's some amazing content. It's very engaging. Right?"
                  data-original-title="2003"
                >
                  {/* <div class="inner-circle"></div> */}

                  {order.transitStatus == "out-transit" ? (
                    <div className="mt-[-4] " style={{ marginTop: "-14px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                        fill="#3b82f6"
                      >
                        <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
                      </svg>
                    </div>
                  ) : (
                    <div class="inner-circle"></div>
                  )}

                  <p class="h6 text-muted mb-0 mb-lg-0">Out Trasnsit</p>
                </div>
              </div>
              <div class="timeline-step">
                <div
                  class="timeline-content"
                  data-toggle="popover"
                  data-trigger="hover"
                  data-placement="top"
                  title=""
                  data-content="And here's some amazing content. It's very engaging. Right?"
                  data-original-title="2004"
                >
                  {order.transitStatus == "in-transit" ? (
                    <div className="mt-[-4] " style={{ marginTop: "-14px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                        fill="#3b82f6"
                      >
                        <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
                      </svg>
                    </div>
                  ) : (
                    <div class="inner-circle"></div>
                  )}
                  <p class="h6 text-muted mb-0 mb-lg-0">In Trasnsit</p>
                </div>
              </div>
              <div class="timeline-step">
                <div
                  class="timeline-content"
                  data-toggle="popover"
                  data-trigger="hover"
                  data-placement="top"
                  title=""
                  data-content="And here's some amazing content. It's very engaging. Right?"
                  data-original-title="2005"
                >
                  {order.transitStatus == "out-delivery" ? (
                    <div className="mt-[-4] " style={{ marginTop: "-14px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                        fill="#3b82f6"
                      >
                        <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
                      </svg>
                    </div>
                  ) : (
                    <div class="inner-circle"></div>
                  )}

                  <p class="h6 text-muted mb-0 mb-lg-0">Out for Delivery</p>
                </div>
              </div>
              <div class="timeline-step">
                <div
                  class="timeline-content"
                  data-toggle="popover"
                  data-trigger="hover"
                  data-placement="top"
                  title=""
                  data-content="And here's some amazing content. It's very engaging. Right?"
                  data-original-title="2010"
                >
                  {order.transitStatus == "delivered" ? (
                    <div className="mt-[-4] " style={{ marginTop: "-14px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                        fill="#3b82f6"
                      >
                        <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
                      </svg>
                    </div>
                  ) : (
                    <div class="inner-circle"></div>
                  )}

                  <p class="h6 text-muted mb-0 mb-lg-0">Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
