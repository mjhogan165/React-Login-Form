import React from 'react'

export default function SummaryPayment(props) {
    const {shippingInfo, pageName, cardInfo} = props
    const days = shippingInfo.shippingMethod === "standard" ? "4-6" : "1-3"
    const lastFour = cardInfo.cardNumber.slice(cardInfo.cardNumber.length - 4)
    if(pageName !== "Confirmation"){return null} else
  return (
    <div className='summary-payment' >
        <div className="sum-pay-ship">
            <div>
                <h2>SHIPPING</h2>
                <h3>{shippingInfo.shippingMethod}</h3>
                <p>Delivery in {days} business days</p>
            </div>
            <div>
                <a href="wwww.google.com"> Veiw Shopping Details</a>
            </div>
        </div>
        <div className="sum-pay-ship">
            <div>
                <h2>PAYMENT</h2>
                <h3>MASTERCARD</h3>
                <p>Card#: **** **** **** {lastFour}</p>
            </div>
            <div>
                <a href="wwww.google.com"> Veiw Shopping Details</a>
            </div>
        </div>
    </div>
  )
}
