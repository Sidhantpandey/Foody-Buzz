import React from 'react'
import './Navbar.css'
import { useState } from "react";
import {assets} from '../../assets/assets'
import {Link,useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import {StoreContext} from '../../context/StoreContext'

// on reloading we are getting loggout 


function Navbar ({setshowLogin}){
  const [menu, setmenu] = useState("home")

  const {getTotalCartAmount,token,setToken} = useContext(StoreContext)


    // we will use Navigate
  const navigate=useNavigate();
  const logout=()=>{
    // remember for logout we have to remove the token 
    localStorage.removeItem("token");
    setToken("");
    // send the user to the home page
    navigate("/")
    
  }



  return (
    <div className='navbar'>
        <Link to="/"><img src={assets.logo} alt=""  className="logo"/></Link>
        <ul className="navbar-menu">
          <Link to={'/'} onClick={()=>setmenu("home")} className={menu==="home"?"active":""}>home</Link>
          <a href="#explore-menu" onClick={()=>setmenu("menu")} className={menu==="menu"?"active":""}>menu</a>
          <a href="#app-download" onClick={()=>setmenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
          <a href="#footer" onClick={()=>setmenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className="navbar-right">
      <img src={assets.search_icon} alt="" />
      <div className="navbar-search_icon">
        <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
        <div className={getTotalCartAmount()===0 ? "":"dot"}></div>
      </div>
      {/* if token is available then sign in button will show up but if its not visible then we will replace it with the profile icon  */}
      {!token?<button onClick={()=>setshowLogin(true)} >Sign In</button>
      :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className='nav-profile-dropdown'>
            <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
      </div>
}
    </div>
    </div>
  )
}

export default Navbar