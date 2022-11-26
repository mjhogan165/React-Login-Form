import React from "react";
import "./CartItem.css";

export default function CartItem(props) {
  const { product, removeCartItem } = props;
  const quantityArr = [];
  for (let i = 0; i <= 20; i++) {
    quantityArr.push([i]);
  }

  return (
    <div className="cart-item">
      <div className="product-container">
        <div>
          <i
            onClick={(e) => removeCartItem(props.product.id, e)}
            id="product-x"
            className="fa-solid fa-circle-xmark"
          ></i>
        </div>
        <img src={product.img} alt="" />
        <table className="cart-table">
          <caption>{product.name}</caption>
          <thead>
            <tr>
              <th style={{ width: "30%" }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Color:</th>
              <td>
                <strong>{product.color}</strong>
              </td>
            </tr>
            <tr>
              <th scope="row">Size:</th>
              <td>
                <strong>{product.size}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>{product.price}</div>
      <div>
        <form action="">
          <label htmlFor="quantity">Quantity</label>
          <select
            value={product.inCart}
            onChange={(e) => props.handleQuantityChange(product, e)}
            name="quantity"
            id="quantity"
          >
            <optgroup>
              {quantityArr.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </optgroup>
          </select>
        </form>
      </div>
      <div>{product.total}</div>
    </div>
  );
}
