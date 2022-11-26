import React from "react";
import "./Summary.css";
import ApplyCode from "./ApplyCode";
import SummaryShipping from "./SummaryShipping";
import SummaryPayment from "./SummaryPayment";

import CheckoutButton from "./CheckoutButton";
import SummaryItem from "./SummaryItem";

export default function Summary(props) {
  const {
    setPageName,
    userData,
    pageName,
    handleSubmitShippingInfo,
    userCart,
    shippingInfo,
    handleDiscountCode,
    cardInfo,
    subTotal
  } = props;
  const shippingFee =
    props.shippingInfo.shippingMethod === "standard" ? 0 : 4.99;
  const cartTotal = Number(shippingFee) + Number(subTotal);

  return (
    <div className="container-base summary">
      <h1>Summary</h1>
      {pageName === "Cart" ? (
        <ApplyCode handleDiscountCode={handleDiscountCode} />
      ) : null}
      {userCart.map((product, index) => (
        <SummaryItem
          img={product.img}
          color={product.color}
          inCart={product.inCart}
          price={product.price}
          size={product.size}
          key={index}
        />
      ))}
      <div className="summary-cost">
        <table className="sum-cost-table">
          <caption>Summary of Cost</caption>
          <tbody>
            <tr>
              <th scope="row">Cart Subtotal:</th>
              <td>{subTotal}</td>
            </tr>
            <tr>
              <th scope="row">Shipping & Handling</th>
              <td>{shippingFee}</td>
            </tr>
            <tr>
              <th scope="row">Discount</th>
              <td style={{ color: "green" }}>{props.discount}</td>
            </tr>
            <tr>
              <th scope="row">Cart Total:</th>
              <td style={{ color: "red" }}>
                <strong>{Number(cartTotal).toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <SummaryShipping
        shippingInfo={shippingInfo}
        userData={userData}
        pageName={pageName}
      />
      <SummaryPayment
        shippingInfo={shippingInfo}
        pageName={pageName}
        cardInfo={cardInfo}
      />
      {cartTotal > 0 && (
        <CheckoutButton
          pageName={pageName}
          setPageName={setPageName}
          handleSubmitShippingInfo={handleSubmitShippingInfo}
        />
      )}
    </div>
  );
}
