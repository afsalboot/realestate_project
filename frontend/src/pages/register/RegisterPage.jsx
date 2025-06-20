import React, { useState } from 'react'
import './register.scss'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router'
import {apiRequest} from '../../lib/apiRequest'

const RegisterPage = () => {

  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    const formData = new FormData(e.target);

    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

    try{
      console.log('first check',username,email,password)
      const res = await apiRequest.post("/auth/register",{
        username,email,password
      })
      navigate('/login')
    }catch(err){
      console.log(err.message)
      setError(err.response.data.message)
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to={"/login"}>Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src={assets.bg} alt="" />
      </div>
    </div>
  )
}

export default RegisterPage
