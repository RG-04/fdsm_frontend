import React from "react";

const PostDishImage = ({ image, uid, token }) => {

    if(image === null) {
        naviagate('/restaurant/menu');
        return;
    }

    const url1 = process.env.REACT_APP_BACKEND_URL + '/api/restaurant/menu/images/' + uid;
    console.log("hello",url1);

    fetch(url1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: {file: image}
    }).then((response) => {
        if (response.ok) {
            console.log(response);
            response.json().then((data) => {
                console.log(data);
            });
            navigate('/restaurant/menu');
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

export default PostDishImage;