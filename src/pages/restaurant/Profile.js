import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useOutletContext } from "react-router";
import Loader from "../../components/Loader";

export default () => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const { authState } = useOutletContext();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    tags: "",
    timings: {
      open: 0,
      close: 0,
    },
  });
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/restaurant/info";

    let ignore = false;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((response) => {
        if (ignore) {
          return;
        }

        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setData({
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
              tags: data.tags.join(", "),
              timings: {
                open: data.timings.open,
                close: data.timings.close,
              },
            });
            setImageSrc(data.image);
            setReviews(data.reviews);
            setLoading(false);
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            setLoading(false);
          });
        }
      })
      .catch((error) => {
        if (ignore) {
          return;
        }

        console.log(error);
        alert("An error occurred. Please try again later.");
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [authState.token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!edit) {
      setEdit(true);
      return;
    }

    // Save the form data
    setLoading(true);

    const url = process.env.REACT_APP_API_URL + "/restaurant/info";

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        tags: data.tags.split(",").map((tag) => tag.trim()),
        timings: data.timings,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setLoading(false);
            setEdit(false);
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            setLoading(false);
            setEdit(false);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again later.");
        setLoading(false);
        setEdit(false);
      });

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      fetch(url + "/image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log(response);
            response.json().then((data) => {
              console.log(data);
            });
          } else {
            response.json().then((data) => {
              console.log(data);
              alert(data.error);
            });
          }
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred. Please try again later.");
        });
    }
  };

  if (loading && !edit) {
    return <Loader />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-md mt-10 text-center">
      <img
        src={
          edit && imageFile
            ? URL.createObjectURL(imageFile)
            : process.env.REACT_APP_BACKEND_URL + imageSrc + "?t=" + Date.now()
        }
        alt="Profile Image"
        className="mx-auto rounded-full w-32 h-32 mb-4"
      />
      <form onSubmit={handleSubmit}>
        <div className="text-left space-y-1">
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Name:</span>
            <Input
              type="text"
              value={data.name}
              className="profile-name w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              disabled={!edit}
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Email:</span>
            <Input
              type="email"
              value={data.email}
              className="profile-email w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              disabled={!edit}
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Phone:</span>
            <Input
              type="text"
              value={data.phone}
              className="profile-phone w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              disabled={!edit}
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Address:</span>
            <Input
              type="text"
              value={data.address}
              className="profile-address w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              disabled={!edit}
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Tags:</span>
            <Input
              type="text"
              value={data.tags}
              className="profile-tags w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, tags: e.target.value })}
              disabled={!edit}
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Timings:</span>
            <div className="inline-flex items-center w-2/3">
              <Input
                name="openTime"
                type="number"
                id="openTime"
                className="mr-2 text-center"
                value={data.timings.open}
                onChange={(e) =>
                  setData({
                    ...data,
                    timings: { ...data.timings, open: e.target.value },
                  })
                }
                showLabel={false}
                disabled={!edit}
              />
              <p className="m-0">hrs&nbsp;to&nbsp;</p>
              <Input
                name="closeTime"
                type="number"
                id="closeTime"
                className="text-center"
                value={data.timings.close}
                onChange={(e) =>
                  setData({
                    ...data,
                    timings: { ...data.timings, close: e.target.value },
                  })
                }
                showLabel={false}
                disabled={!edit}
              />
              <p className="m-0">hrs</p>
            </div>
          </div>
          {edit && (
            <div className="flex items-center">
              <span className="font-semibold w-1/3">Tags:</span>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                }}
              />
            </div>
          )}
        </div>
        <button
          id="editButton"
          className="mt-6 bg-transparent hover:bg-gray-200 text-gray-800 font-semibold hover:text-gray-900 py-2 px-4 border border-gray-300 rounded-md shadow-md transition duration-300 ease-in-out"
          disabled={loading}
        >
          {edit ? (loading ? "Saving" : "Save") : "Edit"} Profile
        </button>
      </form>
    </div>
  );
};
