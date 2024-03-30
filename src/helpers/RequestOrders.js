import React from "react";

export const requestOrders = async (cartItems, token, address, discount, code) => {
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

    const url = process.env.REACT_APP_BACKEND_URL + "/api/customer/order";

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

    return { successfulOrders, failedOrders };
};
