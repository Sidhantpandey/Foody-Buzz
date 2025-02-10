import jwt from "jsonwebtoken"
const authMiddleware=async(req,res,next)=>{
    // we will take the token from the user and then destructure it 
    const {token}=req.headers; // is in the headers 
    if(!token){
        res.json({succes:false,message:"Not Authorized Login Again"})
    }

    // token decode
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        // when we decode it we will get the id 
        req.body.userId=token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

export default authMiddleware


// basically its taking token -> converting into user id -> by which data will be deleted or added