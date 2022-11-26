import React from "react";
import "./Payment.css";
import { years, months } from "../../../Variables.js";
import CheckoutInput from "../CheckoutInput";

export default function Payment(props) {
  const {
    error,
    handleFormInput,
    cardInfo,
    setPageName,
    cardType,
    maxLength,
    handleCardOnBlur,
  } = props;
  const length = 4;
  const inputObj = [
    {
      label: "Cardholder Name",
      name: "cardName",
      type: "text",
    },
    {
      label: "Card Number",
      name: "cardNumber",
      type: "text",
    },
  ];
  return (
    <div className="container-base payment-wrap">
      <form className="checkout-form-base" action="">
        <h1>Payment Information</h1>
        <div className="payment-grid">
          {inputObj.map((item, index) => (
            <CheckoutInput
              key={index}
              error={error}
              label={item.label}
              name={item.name}
              type={item.type}
              maxLength={maxLength}
              handleFormInput={(e) => handleFormInput("cardInfo", e)}
              handleCardOnBlur={handleCardOnBlur}
              value={cardInfo[item.name]}
              cardType={cardType}
            />
          ))}
          <div className="input-row">
            <label className="label-select">
              Exp Date
              {error.month && (
                <div className="payment-error">{error.month}</div>
              )}
              {error.year && <div className="payment-error">{error.year}</div>}
            </label>
            <div className="exp-date">
              <select
                className="select-month"
                onChange={(e) => handleFormInput("cardInfo", e)}
                name="month"
                id=""
              >
                <option value="">-</option>
                {months.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="select-year"
                onChange={(e) => handleFormInput("cardInfo", e)}
                name="year"
                id=""
              >
                <option value="">-</option>
                {years.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-row">
            <label className="label-cvv" name="code" htmlFor="">
              {" "}
              CVV
            </label>
            <input
              onChange={(e) => handleFormInput("cardInfo", e)}
              id="input-cvv"
              name="code"
              type="text"
              maxLength={3}
              value={cardInfo.code}
              onInput={(e) => {
              }}
            />
            {error.code && <div className="shippingError">{error.code}</div>}
          </div>
        </div>
      </form>
      <button
        className="button btn-bw"
        onClick={(e) => setPageName("Shipping", e)}
      >
        back
      </button>
    </div>
  );
}
