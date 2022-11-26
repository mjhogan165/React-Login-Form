import React from 'react'

export default function ShippingSummary(props) {
  const {shippingInfo, userData, pageName} = props
  const days = shippingInfo.shippingMethod === "standard" ? "4-6" : "1-3"
  if(pageName !== "Payment"){
    return null
  }
  return (
    <div className='summary-shipping'>
      <div className="sum-ship-address">
          <h2>SHIPPING ADDRESS</h2>
          <ul>
            <li>{shippingInfo.addressTitle}</li>
            <li>{shippingInfo.yourAddress}</li>
            <li>{shippingInfo.city + ", " + shippingInfo.usState+ " " + shippingInfo.zipCode} </li>
            <li>{userData.email}</li>
          </ul>
      </div>
      <div className="sum-ship-method">
          <h2>SHIPPING METHOD</h2>
          <h3>{shippingInfo.shippingMethod}</h3>
          <p>Delivery in {days} business days</p>
      </div>
    </div>
  )
}
