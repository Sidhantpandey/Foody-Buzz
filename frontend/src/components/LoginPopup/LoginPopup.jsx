import React from 'react'
import './LoginPopup.css'
import {assets} from '../../assets/assets'
import {useState,useEffect,useContext} from 'react'
import {StoreContext} from '../../context/StoreContext'
import axios from "axios"



const LoginPopup = ({setshowLogin}) => {
    const [currState, setcurrState] = useState("Login")

    const {url,setToken}=useContext(StoreContext)

    // making states for data to be stored 
    const [data, setdata] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name
        const value=event.target.value
        setdata(data=>({...data,[name]:value}))
    }

    const onLogin=async(event)=>{
        event.preventDefault()
        // we will add the logic to call the apis
        let newUrl=url;
        if(currState==='Login'){
          newUrl+="/api/user/login"
        }
        else{
          newUrl+="/api/user/register"
        }
        const response=await axios.post(newUrl,data)

        if(response.data.success){
          // we need state variable to save the token 
          // made that in store context 
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setshowLogin(false)


        }
        else{
          alert(response.data.message)


        }

    }

useEffect(() => {
  console.log(data);
}, [data])



  return (
    <div className='login-popup'>
      <form onSubmit={onLogin}className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setshowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your E-Mail' required />
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required />
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione.</p>
        </div>
        {currState==="Login"
        ?<p>Create a new Account? <span onClick={()=>setcurrState("Sign Up")}>Click here </span></p>
        :<p>Already have a account?<span onClick={()=>setcurrState("Login")}>Login Here</span></p>


        }
      </form>
    </div>
  )
}

export default LoginPopup