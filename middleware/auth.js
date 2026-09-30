import asyncHandler from "../utils/asynchandler.js"
import  {ApiError} from "../utils/apiError.js"
import {User} from "../db/user.model.js"
import apiResponse from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"


const auth=asyncHandler(async(req,res,next)=>{
   
    // TODO: Create authentication middleware
// 1. Get the accessToken from req.cookies
// 2. Check whether the accessToken exists
// 3. Verify the token using jwt.verify()
// 4. Extract the user _id from the decoded token
// 5. Find the user in MongoDB using the decoded _id
// 6. Exclude password and refreshToken from the user data
// 7. Check whether the user exists
// 8. Attach the authenticated user to req.user
// 9. Call next() to continue to the next middleware/controller
// 10. Handle invalid/expired token errors

    const token=req.cookie?.acessToken;
    if(!token){
        throw new ApiError(401,"Unauthorised Acess");
    }

    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    if(!decodedToken){
        throw new ApiError(401,"Cannot Acess");
    }

    const user=User.findById(decodedToken._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(401,"Not Sign IN");
    }
    req.user=user;
    next();

    // We are finding this by verifiedToken._id because we find out them by this acess method so 

    // userSchema.methods.generateAccessToken=function(){
    //    return jwt.sign(
    //         {
    //             _id:this._id,   ///---- This method 
    //             email:this.email,
    //             username:this.username,
    //             fullname:this.fullName
    //         },
    //         process.env.ACCESS_TOKEN_SECRET,
    //         {
    //             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    //         }
    //     )
});
    export  default auth;