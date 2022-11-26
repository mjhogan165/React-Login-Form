import React, { Component } from "react";
import LoginContainer from "./Login/LoginContainer";
import CustomerCheckout from "../Container/CustomerCheckout/CustomerCheckout";
import {
  validateName,
  validatePassword,
  validateZip,
  validateConfirmPassword,
  validateEmail,
} from "../Validation.js";
import hat from "../assets/hat.png";
import shoe from "../assets/shoe.png";
import shoe2 from "../assets/shoe2.png";

class Account {
  constructor(email, password, firstName, lastName, zipCode) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.zipCode = zipCode;
  }
}
let accountsVar = [
  {
    email: "firstEmail@gmail.com",
    password: "Password2@2",
    firstName: "Rebecca",
    lastName: "Scoob",
    zipCode: "01746",
  },
  {
    email: "secondEmail@gmail.com",
    password: "Password34$$",
    firstName: "Steve",
    lastName: "Steveyson",
    zipCode: "02886",
  },
];

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: "Login",
      userData: {
        email: "myemail@emailewrere.com",
        createPassword: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        zipCode: "",
        enterPassword: "",
      },
      error: {},
      selectedRadio: "Sign In",
      userCart: [
        {
          id: "0",
          img: `${hat}`,
          price: "5.99",
          name: "Ron Lauren Signature Hat",
          color: "Green",
          size: "Large Unisex",
          inCart: "1",
          total: "5.99",
        },
        {
          id: "1",
          img: `${shoe}`,
          price: "10.99",
          name: "Vans Old Skool Core Classics",
          color: "Teal",
          size: "Mens 12",
          inCart: "1",
          total: "10.99",
        },
        {
          id: "3",
          img: `${shoe2}`,
          price: "12.99",
          name: "Air Jordan 1 Mid",
          color: "Blue",
          size: "Mens 12",
          inCart: "1",
          total: "12.99",
        },
      ],
      subTotal: 29.97,
      discount: 0,
    };
  }

  handleLoginInput = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [name]: value,
      },
    }));
  };
  handleRadioChange = (e) => {
    console.log('sdfs')
    for (const key of Object.keys(this.state.userData)) {
      this.setState((prevState) => ({
        userData: {
          ...prevState.userData,
          [key]: "",
        },
      }));
    }
    this.setState(() => {
      return {
        selectedRadio: e.target.value,
        error: {},
      };
    });
  };

  setErrorStateOf = (key, value) => {
    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        [key]: value,
      },
    }));
  };

  handleValidations = (name, value) => {
    const { userData, selectedRadio } = this.state;
    let errorMessage = "";
    switch (name) {
      case "email":
        this.setErrorStateOf(
          name,
          validateEmail(name, value, accountsVar, selectedRadio)
        );
        break;

      case "createPassword":
        let confirmPW = userData.confirmPassword;
        if (confirmPW === "") {
          this.setErrorStateOf(name, validatePassword(value, confirmPW));
        } else {
          if (confirmPW !== value) {
            this.setErrorStateOf(name, "Passwords Do Not Match");
          } else
            this.setState((prevState) => ({
              error: {
                ...prevState.error,
                createPassword: validatePassword(value, confirmPW),
                confirmPassword: validateConfirmPassword(confirmPW, value),
              },
            }));
        }
        break;

      case "confirmPassword":
        let createPW = userData.createPassword;
        if (createPW === "") {
          this.setErrorStateOf(name, validateConfirmPassword(value, createPW));
        } else {
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              createPassword: validatePassword(createPW, value),
              confirmPassword: validateConfirmPassword(value, createPW),
            },
          }));
        }
        break;

      case "enterPassword":
        if (value === "") {
          errorMessage = "Please Enter Password";
          this.setErrorStateOf(name, errorMessage);
        } else {
          this.setErrorStateOf(name, errorMessage);
        }
        break;

      case "firstName":
        errorMessage = validateName(name, value);
        this.setErrorStateOf(name, errorMessage);
        break;

      case "lastName":
        errorMessage = validateName(name, value);
        this.setErrorStateOf(name, errorMessage);
        break;

      case "zipCode":
        errorMessage = validateZip(value);
        this.setErrorStateOf(name, errorMessage);
        break;
      default:
    }
  };

  handleOnBlur = (e) => {
    const { name, value } = e.target;
    this.handleValidations(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userData, selectedRadio } = this.state;
    let hasErrors = false;

    if (selectedRadio === "Sign In") {
      let isValidEmail = false;
      let isValidPassword = false;

      if (userData.email === "") {
        hasErrors = true;
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            email: "Field Required",
          },
        }));
      }
      if (userData.enterPassword === "") {
        hasErrors = true;
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            enterPassword: "Field Required",
          },
        }));
      }

      if (!hasErrors) {
        for (const elm of accountsVar) {
          for (const value of Object.values(elm)) {
            if (value === userData.email) {
              isValidEmail = true;
              isValidPassword = elm.password === userData.enterPassword;
              break;
            } else if (value === userData.enterPassword) {
              isValidPassword = true;
              isValidEmail = elm.email === userData.email;
              break;
            }
          }
          if (!isValidEmail || !isValidPassword) {
            hasErrors = true;
          } else {
            this.setState((prevState) => ({
              userData: {
                email: elm.email,
                firstName: elm.firstName,
                lastName: elm.lastName,
                password: elm.password,
                zipCode: elm.zipCode,
              },
            }));
            break;
          }
        }
        if (isValidEmail && !isValidPassword) {
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              enterPassword: "Invalid Passwordd",
            },
          }));
        } else if (!isValidEmail) {
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              email: "Email Not Found",
            },
          }));
        }
      }
      if (!hasErrors) {
        this.setState((prevState) => ({
          pageName: "Customer Checkout",
        }));
      }
    } else {
      for (const [key, value] of Object.entries(userData)) {
        if (value === "" && key !== "enterPassword") {
          hasErrors = true;
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              [key]: "Field Required",
            },
          }));
        }
      }
      for (const value of Object.values(this.state.error)) {
        if (value.length > 1) {
          hasErrors = true;
        }
      }
      if (!hasErrors) {
        let newAccount = new Account(
          userData.email,
          userData.confirmPassword,
          userData.firstName,
          userData.lastName,
          userData.zipCode
        );
        this.setState(() => ({
          userData: newAccount,
          pageName: "Customer Checkout",
        }));
      }
    }
  };
  removeCartItem = (id, e) => {
    const { userCart } = this.state;
    let sum = 0;
    const adjustedArr = userCart.map((obj) => {
      if (obj.id === id) {
        return { ...obj, inCart: 0 };
      }
      return obj;
    });

    for (const i of adjustedArr) {
      sum += Number(i.inCart) * Number(i.price);
    }

    this.setState((prevState) => ({
      userCart: adjustedArr,
      subTotal: sum.toFixed(2),
    }));
  };
  handleDiscountCode = (e) => {
    const discount = 4.99;
    const discountedTotal = (this.state.subTotal - discount).toFixed(2);
    this.setState((prevState) => ({
      subTotal: discountedTotal,
      discount: discount,
    }));
  };
  handleQuantityChange = (product, e) => {
    const selection = e.target.value;
    const { userCart } = this.state;

    product.inCart = selection;
    const total = product.price * product.inCart;
    product.total = total.toFixed(2);

    let sum = 0;
    for (const i of userCart) {
      sum += Number(i.total);
    }

    this.setState(() => ({
      userCart: userCart,
      subTotal: sum.toFixed(2),
    }));
  };

  render() {
    const { pageName, userData, userCart, subTotal, selectedRadio, error } =
      this.state;

    switch (true) {
      case pageName === "Login":
        return (
          <LoginContainer
            pageName={pageName}
            handleSubmit={this.handleSubmit}
            userData={userData}
            handleLoginInput={this.handleLoginInput}
            accountsVar={accountsVar}
            handleOnBlur={this.handleOnBlur}
            error={error}
            selectedRadio={selectedRadio}
            handleRadioChange={this.handleRadioChange}
          />
        );
      case pageName === "Customer Checkout":
        return (
          <CustomerCheckout
            userData={userData}
            userCart={userCart}
            handleQuantityChange={this.handleQuantityChange}
            subTotal={subTotal}
            handleDiscountCode={this.handleDiscountCode}
            removeCartItem={this.removeCartItem}
            discount={this.state.discount}
          />
        );

      default:
        return <div>Error</div>;
    }
  }
}
