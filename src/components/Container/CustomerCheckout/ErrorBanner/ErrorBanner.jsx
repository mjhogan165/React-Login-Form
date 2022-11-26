import React from "react";
import "./ErrorBanner.css"

export default function ErrorBanner() {
  return (
    <div className="error-banner">
      <i id="banner-x" className="fa-solid fa-xmark error-banner"></i>
      <div>
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>
      <div>
        <p>one out of stock item removed</p>
        <p>item name</p>
      </div>
    </div>
  );
}
