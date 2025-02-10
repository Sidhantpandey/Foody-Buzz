import { createContext } from "react";
// import { food_list } from "../assets/assets";
import {useState,useEffect} from 'react'
import axios from "axios"

export const StoreContext=createContext(null)

const StoreContextProvider= (props)=>{


    const [cardItems, setcardItems] = useState({});
    // backend url
    const url="http://localhost:4000"
    // token
    const [token, setToken] = useState("")


    const [food_list, setFoodList] = useState([])




    const addToCart=async(itemId)=>{
        //if user is adding item first time in the cart then this statement is executed
        if(!cardItems[itemId]){
            setcardItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setcardItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart= async(itemId)=>{
        setcardItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }

    }

    // fn which returns cart total
    const getTotalCartAmount = () => {
        let totalamount = 0;
        for (const item in cardItems) {
            if (cardItems[item] > 0) {
                let iteminfo = food_list.find((product) => String(product._id) === String(item));
                if (iteminfo) {  // Ensure iteminfo is not undefined
                    totalamount += iteminfo.price * cardItems[item];
                }
            }
        }
        return totalamount;
    };
    
     

    
    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    // when we are refreshing the web page the cart items are getting reset again , fixed this below
    const loadCartData= async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setcardItems(response.data.cartData)
    }
     
    useEffect(() => {
        async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
      }
      loadData();
    }, [])
    
    const contextValue={
        food_list,
        cardItems,
        setcardItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken

    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

