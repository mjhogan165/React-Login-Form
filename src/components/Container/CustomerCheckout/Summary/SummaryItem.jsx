import React from "react";

export default function SummaryItem(props) {
  const { img, color, price, size, inCart } = props;
  if (inCart === "0") {
    return null;
  } else
    return (
      <div className="summary-item">
        <div className="sum-it-img-wrap">
          <img src={img} alt="" />
        </div>
        <div className="sum-it-prod-info">
          <h3>Item</h3>
          <table className="sum-it-table">
            <tbody>
              <tr>
                <th scope="row">color</th>
                <td>{color}</td>
              </tr>
              <tr>
                <th scope="row">Size </th>
                <td>{size}</td>
              </tr>
              <tr>
                <th scope="row">Qty</th>
                <td>{inCart}</td>
              </tr>
            </tbody>
          </table>
          <div className="sum-it-price">{price}</div>
        </div>
      </div>
    );
}
