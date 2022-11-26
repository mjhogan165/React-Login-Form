import React, { Component } from "react";
import "./CustomerCart.css";
import CartItem from "./CartItem/CartItem";

export default class CustomerCart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { userCart, handleQuantityChange, removeCartItem } = this.props;
    return (
      <div className="container-base customer-cart">
        <div className="cart-heading">
          <h1 className="product-header">
            <div></div>Product
          </h1>
          <h1>Price</h1>
          <h1>Quantity</h1>
          <h1>Total</h1>
        </div>
        {userCart.map(
          (product) =>
            product.inCart > 0 && (
              <CartItem
                key={product.id}
                product={product}
                handleQuantityChange={handleQuantityChange}
                removeCartItem={removeCartItem}
              />
            )
        )}
      </div>
    );
  }
}
