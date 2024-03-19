import React, { useState, useEffect } from 'react';
import './NewItem.css';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantNavbar from './RestaurantNavbar';
import { useRestaurantAuthContext } from '../../../hooks/useRestaurantAuthContext';

const RestaurantNewItem = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const { restaurantAuthState } = useRestaurantAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (restaurantAuthState.token === '') {
            navigate('/restaurant/login');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, image, price);

        const url = process.env.REACT_APP_BACKEND_URL + '/api/restaurant/menu';
        console.log(url);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${restaurantAuthState.token}`
            },
            body: JSON.stringify({
                name: name,
                image: image,
                price: price
            })
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                response.json().then((data) => {
                    console.log(data);
                    navigate('/restaurant/menu');
                });
            } else {
                response.json().then((data) => {
                    console.log(data);
                    alert(data.error);
                });
            }
        }).catch((error) => {
            console.log(error);
            alert('An error occurred. Please try again later.');
        });
    }

    return (
        <>
            <div className='restaurant-new-item'>
                <RestaurantNavbar />

                <div className="all-container">

                    <div className="new-item-form">
                        <h2>Item Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="input-button">Proceed</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantNewItem;


