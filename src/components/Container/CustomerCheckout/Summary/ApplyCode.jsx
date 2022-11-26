import React from "react";

export default function ApplyCode(props) {
  const {handleDiscountCode} = props
  return (
    <div className="promo-container">
      <p>Do you have a promo code?</p>
      <div>
        <input type="text" name="code" id="code" />
        <button onClick={handleDiscountCode} className="button btn-bw">
          APPLY
        </button>
      </div>
    </div>
  );
}
