import express from "express"
import cors from "cors"
import connectdb from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import 'dotenv/config'


const app=express()
const port=4000


//middlewares
app.use(express.json()) 
// whenerver request is made that is passed via this json conversion 
app.use(cors());
// db connection 
connectdb()




// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)




app.get("/",(req,res)=>{
    res.send("Api Working")
}) 
app.listen(port,()=>{
    console.log(`App is listening at port ${port}`)
})

