import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import {useState} from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
function App() {

  // to pop up we are creating a state variable
  
  const [showLogin, setshowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setshowLogin={setshowLogin} />:<></>}
    <div className='app'>
      <Navbar setshowLogin={setshowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App