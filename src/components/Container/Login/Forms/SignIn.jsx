import React from "react";
import InputBase from "../Forms/InputBase/InputBase.jsx";

export default function SignIn(props) {
  const {
    handleOnBlur,
    handleLoginInput,
    error,
    toggleShowPassword,
    showPassword,
  } = props;
  const inputObj = [
    {
      label: "Email",
      name: "email",
      type: "text",
      placeHolder: "E-mail",
      isPassword: false,
    },
    {
      label: "Password",
      name: "enterPassword",
      type: "password",
      placeHolder: "Password",
      isPassword: true,
    },
  ];
  return (
    <div className="input-wrapper">
      {inputObj.map((item) => (
        <div className="input-item" key={item.name}>
          <div className="input-label">{item.label}</div>
          <InputBase
            name={item.name}
            handleLoginInput={handleLoginInput}
            type={item.type}
            handleOnBlur={handleOnBlur}
            error={error}
            isPassword={item.isPassword}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        </div>
      ))}
    </div>
  );
}
