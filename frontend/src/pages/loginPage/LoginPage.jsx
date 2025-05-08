import React, { useContext, useState } from 'react'
import "./loginPage.scss"
import { Link, useNavigate } from 'react-router'
import { assets } from '../../assets/assets'
import apiRequest from '../../lib/apiRequest'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {


  const [error,setError] = useState("")

  const [isLoading,setIsLoading] = useState(false)

  const {updateUser} = useContext(AuthContext);
  

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    const formData = new FormData(e.target);

    const username = formData.get("username")
    const password = formData.get("password")

    try{
      const res = await apiRequest.post("/auth/login",{
        username,
        password,
      });
        console.log("res****",res.data)
      // const token = res.data.token;
      // localStorage.setItem("token", token);
      // console.log("token extract from user login:",token)

      
      updateUser(res.data)
      console.log(res.data)

      navigate('/')
    }catch(err){
      console.log(err.message)
      setError(err.response.data.message)
    }finally{
      setIsLoading(false)
    }
  };


  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">Don't you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src={assets.bg} alt="" />
      </div>
    </div>
  )
}

export default LoginPage
