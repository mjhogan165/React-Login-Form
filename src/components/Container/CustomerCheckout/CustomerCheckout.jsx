import React, { Component } from "react";
import CustomerCart from "./CustomerCart/CustomerCart";
import Summary from "./Summary/Summary";
import "./CustomerCheckout.css";
import Shipping from "./Shipping/Shipping";
import ErrorBanner from "./ErrorBanner/ErrorBanner";
import ProgressBanner from "./ProgressBanner/ProgressBanner";
import Payment from "./Payment/Payment";
import Confirmation from "./Confirmation/Confirmation";
import { cardNumberValidation, isPhoneNumber } from "../../Validation";
import { OTHERCARDS } from "../../Variables";
import { isCompositeComponent } from "react-dom/test-utils";

export default class CustomerCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageName: "Customer Cart",
      maxLength: OTHERCARDS.length,
      shippingInfo: {
        addressTitle: "",
        nameSurName: "",
        yourAddress: "",
        zipCode: "",
        country: "",
        city: "",
        usState: "",
        // one: "1 ",
        cellPhone: "",
        telephone: "",
        shippingMethod: "",
      },
      cardType: "",
      cardInfo: {
        cardName: "",
        cardNumber: "",
        month: "",
        year: "",
        code: "",
      },
      error: {},
    };
  }

  setPageName = (string, e) => {
    e.preventDefault();
    this.setState(() => ({
      pageName: string,
    }));
  };

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
    return "";
  };

  handleFormInput = (objStr, e) => {
    const { name, value } = e.target;
    const formatNum = /([0-9]{3})([0-9]{3})([0-9]{4})/;
    const noChars = /[^\d]/gi;
    const noNums = /[^a-z]/gi;


    switch (name) {
      case "cardName":
        // let val = value.split(" ").join("").replace(noNums, "");
        this.setState((prevState) => ({
          [objStr]: {
            ...prevState[objStr],
            [name]: value.replace(/[^a-z ]/, ""),
          },
        }));
        break;
      case "cardNumber":
        console.log('cardnumber switch')
          let mask = value.split(" ").join("");
          console.log(typeof mask)
          
          if (mask.length) {
            mask = mask.match(new RegExp(".{1,4}", "gi")).join(" ");
            this.setState((prevState) => ({
              [objStr]: {
                ...prevState[objStr],
                [name]: mask.replace(/[^\d ]/, ""),
              },
            }));
          } else {
            this.setState((prevState) => ({
              [objStr]: {
                ...prevState[objStr],
                [name]: "",
              },
            }));
          }
        break;
      case ("cellPhone"||"telephone"):
        console.log('phone switch')
        let num = value.split(" ").join("");
        if (formatNum.exec(num)) {
          const match = formatNum.exec(num);
          match.shift();
          num = match.join(" ");
          this.setState((prevState) => ({
            [objStr]: {
              ...prevState[objStr],
              [name]: num,
            },
          }));
        } else
          this.setState((prevState) => ({
            [objStr]: {
              ...prevState[objStr],
              [name]: value.replace(noChars, ''),
            },
          }));
        break;
        case ("code"):
        console.log('phone switch')
        let code = value.split(" ").join("");
        if (formatNum.exec(code)) {
          const match = formatNum.exec(code);
          match.shift();
          code = match.join(" ");
          this.setState((prevState) => ({
            [objStr]: {
              ...prevState[objStr],
              [name]: code,
            },
          }));
        } else
          this.setState((prevState) => ({
            [objStr]: {
              ...prevState[objStr],
              [name]: value.replace(noChars, ''),
            },
          }));
        break;
        
    
      default:
        this.setState((prevState) => ({
          [objStr]: {
            ...prevState[objStr],
            [name]: value,
          },
        }));
        break;
    }
    // if (isPhoneNumber(name)) {
    //   let num = value.split(" ").join("");
    //   if (formatNum.exec(num)) {
    //     const match = formatNum.exec(num);
    //     match.shift();
    //     num = match.join(" ");
    //     this.setState((prevState) => ({
    //       [objStr]: {
    //         ...prevState[objStr],
    //         [name]: num,
    //       },
    //     }));
    //   } else
    //     this.setState((prevState) => ({
    //       [objStr]: {
    //         ...prevState[objStr],
    //         [name]: value.replace(noChars, ''),
    //       },
    //     }));
    // } else {
    //   this.setState((prevState) => ({
    //     [objStr]: {
    //       ...prevState[objStr],
    //       [name]: value.replace(noChars, ''),
    //     },
    //   }));
    // }
  };

  handleSubmitShippingInfo = (objStr, e) => {
    let hasErrors = false;
    this.setState(() => {
      return { error: {} };
    });

    for (const [key, value] of Object.entries(this.state[objStr])) {
      if (value === "") {
        hasErrors = true;
        this.setState((state, props) => {
          return { error: { ...state.error, [key]: "Blank Input" } };
        });
      }
    }
    for (const [key, value] of Object.entries(this.state[objStr])) {
      if (isPhoneNumber(key) || key === "zipCode") {
        if (isNaN(value) || value.includes("e")) {
          hasErrors = true;
          this.setState((state, props) => {
            return {
              error: { ...state.error, [key]: "Cannot Contain Letters" },
            };
          });
        }
      }

      let errorText;
      if (key === "cardNumber") {
        errorText = cardNumberValidation(value);
        hasErrors = errorText ? true : false;
        this.setState((prevState) => ({
          cardType: this.findDebitCardType(value),
          error: {
            ...prevState.error,
            [key]: errorText,
          },
        }));
      }
    }
    if (!hasErrors) {
      this.state.pageName === "Shipping"
        ? this.setState(() => {
            return { pageName: "Payment" };
          })
        : this.setState(() => {
            return { pageName: "Confirmation" };
          });
    }
  };

  handleCardOnBlur = (e) => {
    const { name, value } = e.target;
    let errorText;
    if (name === "cardNumber") {
      errorText = cardNumberValidation(value);
      this.setState((prevState) => ({
        cardType: this.findDebitCardType(value),
        error: {
          ...prevState.error,
          [name]: errorText,
        },
      }));
    }
  };

  returnGridComponentB = (pageName, ...components) => {
    switch (true) {
      case pageName === "Cart":
        return components[0];
      case pageName === "Shipping":
        return components[1];
      case pageName === "Payment":
        return components[2];
      case pageName === "Confirmation":
        return components[3];
      default:
        return "Component Error";
    }
  };

  returnGridComponentA = (screenName) => {
    return <ProgressBanner pageName={this.state.pageName} />;
  };
  handleShippingMethod = (e) => {
    const selection = e.target.value;
    this.setState((prevState) => ({
      shippingInfo: { ...prevState.shippingInfo, shippingMethod: selection },
    }));
  };

  render() {
    const { pageName, cardInfo, maxLength, cardType, shippingInfo } =
      this.state;
    const {
      userCart,
      userData,
      discount,
      subTotal,
      removeCartItem,
      handleQuantityChange,
      handleDiscountCode,
    } = this.props;
    const gridA = this.returnGridComponentA(pageName);
    const gridB = this.returnGridComponentB(
      pageName,
      <CustomerCart
        userCart={userCart}
        handleQuantityChange={handleQuantityChange}
        removeCartItem={removeCartItem}
        handleShippingMethod={this.handleShippingMethod}
      />,
      <Shipping
        userCart={userCart}
        handleFormInput={this.handleFormInput}
        handleShippingMethod={this.handleShippingMethod}
        setPageName={this.setPageName}
        error={this.state.error}
        shippingInfo={shippingInfo}
        shippingMethod={shippingInfo.shippingMethod}
        handleShippingOnBlur={this.handleShippingOnBlur}
      />,
      <Payment
        setPageName={this.setPageName}
        error={this.state.error}
        handleFormInput={this.handleFormInput}
        userCart={userCart}
        cardInfo={cardInfo}
        handleCardOnBlur={this.handleCardOnBlur}
        maxLength={maxLength}
        cardType={cardType}
      />,
      <Confirmation />
    );
    return (
      <div
        className={
          "container-base checkout-container " +
          (pageName === "Confirmation" ? " confirmation-layout" : "")
        }
      >
        <div className="checkout-banner checkout-grid-a">{gridA}</div>
        <div className="checkout-grid-b">{gridB}</div>
        <div className="checkout-grid-c">
          <Summary
            handleSubmitShippingInfo={this.handleSubmitShippingInfo}
            userData={userData}
            userCart={userCart}
            subTotal={subTotal}
            setPageName={this.setPageName}
            pageName={pageName}
            shippingInfo={shippingInfo}
            cardInfo={cardInfo}
            handleDiscountCode={handleDiscountCode}
            discount={discount}
          />
        </div>
      </div>
    );
  }
}
