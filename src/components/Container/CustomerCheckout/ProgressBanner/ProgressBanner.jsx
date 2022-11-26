import React from "react";
import "./ProgressBanner.css";

export default function ProgressBanner(props) {
  let onShipping = false;
  let onPayment = false;
  let onConfirmation = false;

  switch (true) {
    case props.pageName === "Confirmation":
      onShipping = true;
      onPayment = true;
      onConfirmation = true;
      break;
    case props.pageName === "Payment":
      onShipping = true;
      onPayment = true;
      break;
    case props.pageName === "Shipping":
      onShipping = true;
      break;
    default:
      break;
  }

  return (
    <div>
      <div className="progress-container">
        <div className="circles">
          <div className="circle-div circle-div-one">
            <div className="circle active">
              <i className="fa-solid fa-circle-check fa-2x"></i>
            </div>
          </div>
          <div className="label-div label-one">Cart</div>
          <div className="circle-div circle-div-two">
            <div className={"circle " + (onShipping ? "active" : "")}>
              <i className="fa-solid fa-circle-check fa-2x"></i>
            </div>
          </div>
          <div className="label-div label-two">Delivery</div>
          <div className="circle-div circle-div-three">
            <div className={"circle " + (onPayment ? "active" : "")}>
              <i className="fa-solid fa-circle-check fa-2x"></i>
            </div>
          </div>
          <div className="label-div label-three">Payment</div>
          <div className="circle-div circle-div-four">
            <div className={"circle " + (onConfirmation ? "active" : "")}>
              <i className="fa-solid fa-circle-check fa-2x"></i>
            </div>
          </div>
          <div className="label-div label-four">Confirmation</div>
        </div>
        <div className="bars">
          <div className={"bar bar-one " + (onShipping ? "active" : "")}></div>
          <div className={"bar bar-two " + (onPayment ? "active" : "")}></div>
          <div
            className={"bar bar-three " + (onConfirmation ? "active" : "")}
          ></div>
        </div>
      </div>
    </div>
  );
}
/* <div style={{width: stringy}}className='progress-bar'>bar</div> */
