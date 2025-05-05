import React, { useContext, useState } from 'react'
import './navbar.scss'
import { assets } from '../../assets/assets' 
import { Link } from 'react-router'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {


  const [open,setOpen] = useState(false)

  const {currentUser} = useContext(AuthContext);

  
  


  return (
    <nav>
      <div className='left'>
        <Link to='/' className='logo'>
          <img src={assets.logo} alt="" />
          <span>NewEstate</span>
        </Link>
        <Link className='a' to='/'>Home</Link>
        <Link className='a' to='/about'>About</Link>
        <Link className='a' to='/contact'>Contact</Link>
        <Link className='a' to='/agents'>Agents</Link>
      </div>
      <div className='right'>
        {currentUser ? (<div className='user'>
          <img src={currentUser.avatar || assets.noavatar } alt="" />
          <span>{currentUser.username}</span>
          <Link to={"/profile"} className='profile a'>
          <div className="notification">
            3
          </div>
          <span>Profile</span>
          </Link>
        </div>) : (<div style={{display: 'flex'}}>
        <Link  to='/login' className='login a'>Sign in</Link>
        <Link to='/register' className='register a'>Sign up</Link>
        </div>)}
        <div className="menuIcon">
          <img src={assets.menu} alt="" onClick={()=>setOpen(prev=>!prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
        <Link className='a' to='/'>Home</Link>
        <Link className='a' to='/about'>About</Link>
        <Link className='a' to='/contact'>Contact</Link>
        <Link className='a' to='/agents'>Agents</Link>
        <Link className='a' to='/login'>Sign in</Link>
        <Link className='a' to='/register'>Sign up</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
