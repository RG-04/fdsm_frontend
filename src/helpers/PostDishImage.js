import React from "react";

const PostDishImage = async ({ image, uid, token }) => {
  console.log("image", image);
  if (image === null) {
    return "success";
  }

  const url1 =
    process.env.REACT_APP_BACKEND_URL + "/api/restaurant/menu/images/" + uid;
  console.log("hello", url1);

  var formData = new FormData();
  formData.append("image", image);

  // for (var pair of formData.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]);
  // }

  console.log("formdata", formData.get("image"));

  try {
    let response = await fetch(url1, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log(response);
      const data = await response.json();
      console.log(data);
      return "success";
    } else {
      const data = await response.json();
      console.log(data);
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred. Please try again later.");
  }

  return "error";
};

export default PostDishImage;
