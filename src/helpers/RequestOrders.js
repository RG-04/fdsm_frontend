import React from "react";

const handlePaymentResponse = (response, splitOrder, token, address, code, isPaid, removeOrder, navigate) => {
    console.log(response);
    if (response.razorpay_payment_id) {
        console.log("Payment successful");

        const url = process.env.REACT_APP_API_URL + "/customer/order/confirm";
        const payment = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
        };

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payment),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Payment successful");
                    placeOrder(splitOrder, token, address, code, isPaid, removeOrder, navigate);
                } else {
                    console.log("Failed to verify payment:", response.status);
                    alert("Payment failed. Please try again later.");
                }
            })
            .catch((error) => {
                console.log("Error occurred while verifying payment:", error);
                alert("Payment failed. Please try again later.");
            });
    } else {
        console.log("Payment failed");
        alert("Payment failed. Please try again later.");
    }
}

const placeOrder = async (splitOrder, token, address, code, isPaid, removeOrder, navigate) => {

    const url = process.env.REACT_APP_API_URL + "/customer/order";

    let successfulOrders = [];
    let failedOrders = [];

    for (const restaurantID in splitOrder) {
        const order = {
            restaurant: restaurantID,
            items: splitOrder[restaurantID].map((item) => {
                return {
                    dish: item.item.uid,
                    quantity: item.count,
                };
            }),
            deliveryAddress: address,
            offerCode: code,
            isPaid: isPaid,
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(order),
            });
            if (response.ok) {
                // Order request successful
                const data = await response.json();
                console.log("Order placed successfully:", data);
                successfulOrders.push(restaurantID);
            } else {
                // Order request failed
                console.log("Failed to place order:", response.status);
                failedOrders.push(restaurantID);
            }
        } catch (error) {
            console.log("Error occurred while requesting order:", error);
            failedOrders.push(restaurantID);
        }
    }

    successfulOrders.map((restaurantID) => {
        removeOrder(restaurantID);
    });

    if (failedOrders.length > 0) {
        alert("Failed to place orders for some restaurants. Please try again later.");
    }
    navigate("/customer/orders");
}

export const requestOrders = async (cartItems, totalPrice, token, address, discount, code, isPaid, removeOrder, navigate) => {
    console.log("CartItems", cartItems);
    let splitOrder = {};
    for (let i = 0; i < cartItems.length; i++) {
        if (splitOrder[cartItems[i].restaurantID]) {
            splitOrder[cartItems[i].restaurantID].push(cartItems[i]);
        } else {
            splitOrder[cartItems[i].restaurantID] = [cartItems[i]];
        }
    }
    console.log("SplitOrder", splitOrder);

    if (Object.keys(splitOrder).length > 1 && code != "") {
        alert("Offer can be applied to only one restaurant at a time.");
        return;
    }

    if (isPaid === true) {
        const url = process.env.REACT_APP_API_URL + "/customer/order/checkout";
        const payment = {
            amount: totalPrice,
        };

        let checkoutData = null;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payment),
            });
            if (response.ok) {
                checkoutData = await response.json();
                console.log("Initiated transaction:", checkoutData);
            } else {
                console.log("Failed to initiate transaction:", response.status);
                alert("Failed to make payment. Please try again later.");
            }
        } catch (error) {
            console.log("Error occurred while making payment:", error);
            alert("Failed to make payment. Please try again later.");
        }

        var options = {
            "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Ea2Go", //your business name
            "description": "New Transaction",
            "image": "https://example.com/your_logo",
            "order_id": checkoutData.transaction.transactionID,
            "handler": (response) => handlePaymentResponse(response, splitOrder, token, address, code, isPaid, removeOrder, navigate),
            "prefill": {
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
            alert("Payment failed. Please try again later.");
        }
        );
    }
    else {
        await placeOrder(splitOrder, token, address, code, isPaid, removeOrder, navigate);
    }
};
