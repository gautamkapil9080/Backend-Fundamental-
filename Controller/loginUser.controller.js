import asyncHandler from "../utils/asynchandler.js"
import  {ApiError} from "../utils/apiError.js"
import {User} from "../db/user.model.js"
import apiResponse from "../utils/apiResponse.js"
import auth from "../middleware/auth.js"


// Method for the Access and Refresh Token: 
    // i) take the id as parameter
    // ii) find the user by the id and get the user Documents
    // iii) After finding the user where we can perfrom the method on it easily : 
    // iv) After calling the method using the finding Value we save refreshToken in Database
    // V) send a Cookie 

const acessTokenRefreshToken=async(id)=>{
    try{
        const user = await User.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();
        user.refereshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { refreshToken, accessToken };
    }
    catch(error){
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Something went wrong while saving tokens");
    }

}   


// To do for the login Step 
// 1. Destructure value username,email,passwords from req.body
// 2. Check the from the database either email or password is found or not.
// 3. Password Check 
const loginUser=asyncHandler(async(req,res)=>{
    
    // 1. Destructure the value : 
    const {email,username,password}=req.body;

    if(!(username || password)){{
        throw new ApiError(400,"Either username or Password Required");
    }}

    // 2. Checking Either username or password is there or not : 
     const user= await User.findOne({
     $or:[{username},{password}]
    });

    if(!user){
        throw new ApiError(400,"User is Not Registered Here");
    }


    // 3. Checking the Password is Correct or not : 
        // One important point : 
        // // If we want to acess this model which we have created then we can use this by 
        // user. not User. because User. is for the mongo model & user. for the our model we creater
    
        const passwordIs= await user.passwordIs(password);
        if(!passwordIs){
            throw new ApiError(400,"Invalid Passwords");
        }
    

        // Step 4 : 

        // Generate the acess toke and Referesh token by passing ref
        // destructure that by calling method 
        // find the login User by passing user._id 
        // then store them into cookie acess and referesh token 
        // Send back the response to them 

            const {refreshToken,acessToken}=await acessTokenRefreshToken (user_.id);

            const loggedInUser=await User.findById(user_.id).select("-password -refreshToken" );

            const options={
                http:true,
                secure:true
            }                         // Key           value
        return res.status(200)
        .cookie("acessToken",acessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new apiResponse(200,{
                user:LoggedInUser,refreshToken,acessToken}
            ,
            "SucessFully Saved The Value"
            )
        )

});

// For Logout : 
        // 1. Clear the Cookies
        // 2. Remove the Refresh token and acess Token :
        
        const logOut=asyncHandler(async(req,res)=>{
            const user=await User.findByIdAndUpdate(req.user._id,
                {
                $set:{
                    refreshToken:undefined
                }
                },
                {
                    new:true
                }
        )
        const options={
            httpOnly:true,
            secure:true
        }
        return res.status(200)
        .clearCookie("acessToken",acessToken)
        .clearCookie("refreshToken",refershToken)
        .json(new apiResponse(200,{},"User Logged Out"));

        })
         
        






export  {loginUser,logOut};
