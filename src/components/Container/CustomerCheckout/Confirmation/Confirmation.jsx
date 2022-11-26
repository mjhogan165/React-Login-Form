import React from "react";
import "./Confirmation.css";

function Confirmation() {
  return (
    <div className="container-base">
      <div className="confirmation-container">
        <h1>Confirmation</h1>
        <div className="confirmation">
          <div>
            <i
              style={{ color: "var(--font-color-selected)" }}
              className="fa-regular fa-circle-check fa-4x"
            ></i>
          </div>
          <h2>Congratulations. Your order is Accepted</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
            magni vitae, consectetur amet ab quidem id.
          </p>
          <button className="button">Track Order</button>
          <button className="button btn-bw">Back to home page</button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
