import React, { useContext, useState } from 'react';
import './profileUpdate.scss';
import { AuthContext } from '../../context/AuthContext';
import { assets } from '../../assets/assets';
import apiRequest from '../../lib/apiRequest';

const ProfileUpdate = () => {
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);

  

  console.log("updateUser", updateUser);
  console.log("currentUser", currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    console.log("Current User ID:", currentUser?.user._id); 

    // if (!currentUser?._id) {
    //     setError("User is not authenticated.");
    //     return;
    // }

    try {
      const res = await apiRequest.put(`/users/update/${currentUser?.user._id}`, {
        username,
        email,
        password,
      });

      updateUser(res.user);
      console.log("update user frontend",res.data)
    } catch (err) {
      console.log(err.message);
      const errorMessage = err?.response?.data?.message || "Something went wrong!";
      setError(errorMessage);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser?.user.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser?.user.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button type="submit">Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser.avatar || assets.noavatar}
          alt=""
          className="avatar"
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
