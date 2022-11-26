import React from "react";

export default function CheckoutButton(props) {
  const { pageName, handleSubmitShippingInfo, setPageName } = props;
  let objStr = {};
  let btnText;

  switch (true) {
    case pageName === "Payment":
      objStr = "cardInfo";
      btnText = "Submit Payment";
      break;
    case pageName === "Shipping":
      objStr = "shippingInfo";
      btnText = "Submit Shipping";
      break;
    case pageName === "Cart":
      btnText = "Checkout";
      return (
        <button
          className="button checkout-btn"
          onClick={(e) => setPageName("Shipping", e)}
        >
          {btnText}
        </button>
      );
    case pageName === "Confirmation":
      return null;
    default:
      break;
  }
  return (
    <button
      className="button checkout-btn"
      onClick={(e) => handleSubmitShippingInfo(objStr, e)}
    >
      {btnText}
    </button>
  );
}
