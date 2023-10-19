import React, { useState } from "react";
import axios from "axios";
// import Card from "./Card";
import img1 from "./imgs/71LYehlp-tL._SX522_.jpg";
import img2 from "./imgs/71lVwl3q-kL._SX679_.jpg";

const Body = () => {
    const checkout = async (amount) => {
        const {
            data: { key },
        } = await axios.get("http://localhost:3000/getkey");
        const {
            data: { order },
        } = await axios.post("http://localhost:3000/getorder", { amount: amount });

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "akhilesh",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            callback_url: "http://localhost:3000/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <>
            <div>
                <img src={img1} />
                <p>price: 3000</p>
                <button onClick={() => checkout(3000)}>buy</button>
            </div>
            <div>
                <img src={img2} />
                <p>price: 2000</p>
                <button onClick={() => checkout(2000)}>buy</button>
            </div>
        </>
    );
};

export default Body;
