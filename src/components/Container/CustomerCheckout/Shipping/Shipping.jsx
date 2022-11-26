import React from "react";
import CheckoutInput from "../CheckoutInput";
import "./Shipping.css";
import { basicInfo, addressDetails, phoneNumbers } from "../../../Variables.js";
import ShippingDropDown from "./ShippingDropDown";

export default function Shipping(props) {
  const {
    handleFormInput,
    shippingInfo,
    error,
    handleShippingMethod,
    shippingMethod,
    setPageName,
    handleShippingOnBlur,
  } = props;
  return (
    <div className="container-base">
      <form className="checkout-form-base" action="">
        <h1>Shipping Information</h1>
        <fieldset id="basic-info">
          {basicInfo.map((input, index) => (
            <CheckoutInput
              label={input.label}
              name={input.name}
              type={input.type}
              key={index}
              error={error}
              handleFormInput={(e) => handleFormInput("shippingInfo", e)}
            />
          ))}
        </fieldset>
        <div id="address-details">
          <div>
            <label htmlFor="">Zip Code</label>
          </div>
          <div className="selection-container">
            <input
              onChange={(e) => handleFormInput("shippingInfo", e)}
              name="zipCode"
              type="text"
              maxLength={5}
            />
            {error.zipCode && (
              <div className="shippingError zip-error">{error.zipCode}</div>
            )}
            {addressDetails.map((item, index) => (
              <ShippingDropDown
                key={index}
                label={item.label}
                name={item.name}
                selectionArray={item.selectionArray}
                handleFormInput={(e) => handleFormInput("shippingInfo", e)}
                error={error}
                shippingInfo={shippingInfo}
              />
            ))}
          </div>
        </div>
        <fieldset id="phone-numbers">
          {phoneNumbers.map((item, index) => (
            <CheckoutInput
              key={index}
              handleFormInput={(e) => handleFormInput("shippingInfo", e)}
              error={error}
              label={item.label}
              name={item.name}
              type={item.type}
              value={shippingInfo[item.name]}
              maxLength={14}
              
            >
              </CheckoutInput>
          ))}
        </fieldset>
        <fieldset id="shipping-radios">
          <h1>Shipping Method</h1>
          <div className="input-row">
            <label htmlFor="standard">
              <input
                type="radio"
                id="standard"
                name="shippingOption"
                value="standard"
                onClick={handleShippingMethod}
              />
              standard
              <div
                style={{
                  display: shippingMethod === "standard" ? "block" : "none",
                }}
              ></div>
            </label>
            <div>Delivery in 4-6 business days - Free ($40 min)</div>
          </div>
          <div className="input-row">
            <label htmlFor="express">
              <input
                type="radio"
                id="express"
                name="shippingOption"
                value="express"
                onClick={handleShippingMethod}
              />
              express
              <div
                style={{
                  display: shippingMethod === "express" ? "block" : "none",
                }}
              ></div>
            </label>
            <div>Delivery in 1-3 Business Days - $4.99</div>
          </div>
        </fieldset>
      </form>
      <div>
        <button
          onClick={(e) => setPageName("Cart", e)}
          className="button btn-bw"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
}
