import React, { useState, useEffect, useRef } from 'react';
import './NewItem.css';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantNavbar from './RestaurantNavbar';
import { useRestaurantAuthContext } from '../../../hooks/useRestaurantAuthContext';

import PostDishImage from '../../../helpers/PostDishImage';

const RestaurantNewItem = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const { restaurantAuthState } = useRestaurantAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (restaurantAuthState.token === '') {
            navigate('/restaurant/login');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, image.name, price);

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
                price: price
            })
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                response.json().then((data) => {
                    console.log(data);
                    PostDishImage({image: image, uid: data.uid,token: restaurantAuthState.token}).then((imageRes) => {
                    if(imageRes === "success") {
                        alert('Item added successfully');
                        navigate('/restaurant/menu');
                    }}).catch((error) => {
                        console.log(error);
                        alert('An error occurred. Please try again later.');
                    });
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

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
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
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="container py-3">

                                <div className="input-group custom-file-button">
                                    <label className="input-group-text" htmlFor="inputGroupFile">Upload Image</label>
                                    <input type="file" className="form-control" id="inputGroupFile" accept='image/*' onChange={(e) => handleImageChange(e)}/>
                                </div>

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


