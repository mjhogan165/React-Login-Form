import React from "react";
import { CARDICON } from "../../Variables.js";

export default function CheckoutInput(props) {
  const {
    label,
    name,
    type,
    handleFormInput,
    error,
    maxLength,
    handleCardOnBlur,
    value,
    cardType,
  } = props;
  const iscardNumber = name === "cardNumber" ? true : false;
  return (
    <div className="input-row">
      <label htmlFor="">{label}</label>
      <input
        onChange={handleFormInput}
        type={type}
        id={name}
        name={name}
        onBlur={handleCardOnBlur}
        value={value}
        maxLength={maxLength}
      />
      {(name === "cellPhone" || name === "telephone") && <span className="phone-prefix">1+</span>}
      {error[name] && <div className="shippingError">{error[name]}</div>}

      {!error[name] && cardType && iscardNumber && (
        <img
          style={{
            position: "absolute",
            top: "18px",
            right: "15px",
            width: "50px",
          }}
          src={CARDICON[cardType]}
          alt="card"
        />
      )}
    </div>
  );
}
