import React, { useState, useEffect } from 'react';
import './Orders.css';
import { Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';

const Orders = () => {
    
        const orders = [{restaurant: "Restaurant Name 1", items: [{name: "Item 1", price: 100}, {name: "Item 2", price: 200}], totalPrice: 300, date: "2020-12-01", status: "Delivered"},
                        {restaurant: "Restaurant Name 2", items: [{name: "Item 3", price: 300}, {name: "Item 4", price: 400}], totalPrice: 700, date: "2020-12-02", status: "Pending"},
                        {restaurant: "Restaurant Name 3", items: [{name: "Item 5", price: 500}, {name: "Item 6", price: 600}], totalPrice: 1100, date: "2020-12-03", status: "Delivered"},
                        {restaurant: "Restaurant Name 4", items: [{name: "Item 7", price: 700}, {name: "Item 8", price: 800}], totalPrice: 1500, date: "2020-12-04", status: "Pending"}];

        const pendingOrders = orders.filter(order => order.status === "Pending");
        const deliveredOrders = orders.filter(order => order.status === "Delivered");

        const PendingOrders = () => {
            return (
                <div className="main-container">
                <div className="orders">
                    <div className="title">Pending Orders</div>
                    {pendingOrders.map((order, index) => (
                        <div className="order" key={index}>
                            <div className="restaurant">{order.restaurant}</div>
                            <div className="items">
                                {order.items.map((item, index) => (
                                    <div className="item" key={index}>
                                        <div className="name">{item.name}</div>
                                        <div className="price">Rs. {item.price}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="date">{order.date}</div>
                            <div className="track-order">
                                <button>Track Order</button>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )
        }

        const DeliveredOrders = () => {
            return (
                <div className="main-container">
                <div className="orders">
                    <div className="title">Delivered Orders</div>
                    {deliveredOrders.map((order, index) => (
                        <div className="order" key={index}>
                            <div className="restaurant">{order.restaurant}</div>
                            <div className="items">
                                {order.items.map((item, index) => (
                                    <div className="item" key={index}>
                                        <div className="name">{item.name}</div>
                                        <div className="price">Rs. {item.price}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="date">{order.date}</div>
                        </div>
                    ))}
                </div>
                </div>
            )
        }

        return (
            <>
                <div className="customer-orders">
    
                    <div className="all-container">
    
                        <CustomerNavbar />
    
                        {pendingOrders.length === 0 && deliveredOrders.length === 0 ? (
                        <div className="main-container">
                            <div className="title">No Orders</div>
                        </div>): (<></>)}
                        {pendingOrders.length !== 0 ? (<PendingOrders />) : (<></>)}
                        {deliveredOrders.length !== 0 ? (<DeliveredOrders />) : (<></>)}
                    </div>
                </div>
            </>
        )
}

export default Orders;