import React, { useContext, useState } from 'react';
import './profileUpdate.scss';
import { AuthContext } from '../../context/AuthContext';
import { assets } from '../../assets/assets';
import   {tokenRequest}  from '../../lib/apiRequest';
import { useNavigate } from 'react-router';


const ProfileUpdate = () => {

  const [error, setError] = useState("");

  const { currentUser, updateUser } = useContext(AuthContext);
  
  const [avatar, setAvatar] = useState({});

 

  const navigate = useNavigate()
  
  console.log("currentUser", currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password, avatar} = Object.fromEntries(formData);

    console.log("Current User ID:", currentUser?._id);
    console.log("Current User TOKEN:", currentUser?.token);
    console.log("current user avatar",currentUser?.avatar);
    
    

    try {
      console.log('First Check',username,email,password,currentUser._id)
      const res = await tokenRequest.put(`/users/update/${currentUser?._id}`, {
        username,
        email,
        password,
        avatar,
      },{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

      updateUser(res.data);
      navigate('/profile')
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
              defaultValue={currentUser?.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser?.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <div className="item">
            <label htmlFor="avatar">Upload Photo</label>
            <input id="avatar" name="avatar" type="file" onChange={(e)=>setAvatar(e.target.files[0])} />
          </div>
          <button type="submit">Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser?.avatar||assets.noavatar}
          alt=""
          className="avatar"
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
