import React from "react";

export default function ShippingDropDown(props) {
  const { error, name, selectionArray, handleFormInput, label } = props;

  return (
    <div className="pos-rel">
      <label htmlFor="">{label}</label>
      <select
        onChange={handleFormInput}
        name={name}
      >
        <option value="">-</option>
        {selectionArray.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {error[name] && (
        <div className="shippingError drop-down-error">{error[name]}</div>
      )}
    </div>
  );
}
