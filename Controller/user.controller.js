
import {cloudinaryFileUpload} from "../utils/cloudinary.js"
import asyncHandler from "../utils/asynchandler.js"
const registerUser=asyncHandler(async(req,res)=>{

  // Step to register User 
  // 1 Take the data from the User By the Frontend
  // 2 Validate the data 
    // 3 Check the User data is already exits or not.
    // 4. Check there is avtar or image.
  // 5. Upload them to Cloudinary
  // 6. create a user Object create entery index.
  // 7. remove password and refeernce token from response.
  //8. Check for the user Creations. 
  //9. return res 



  const {fullName,email,username,password}=req.body;

        // Step 1 : 
    // Method 1: if(fullName===""){
    //   throw new ApiError(400,"Enter the Full Name");
    //  }

    // Method 2:
        if(
            [fullName,email,username,password].some((field)=>field?.trim()==="")
        ){
            throw new ApiError(400,"All Field Are required");
        }

    //  Step 2 : For Validations You can use method By one


    // Step 3 Check User Data Already Exists or Not.
    const existedUser= await User.findOne({
            $or :[{ username },{ email }]
        })
        if(existedUser){
            throw new ApiError(409,"User Already Existed");
        }

    // Step 4 : Check the avatar or image: 
    const avatarPath=req.files?.avatar?.[0]?.path;
    console.log(req.files);
    console.log(avatarPath);
    const coverImageLocalPath=req.files?.coverImage?.[0]?.path;

    if(!avatarPath){
        throw new ApiError(409,"Avtar Will Required");
    }

    // Upload to the cloudinary: 
    const avatarUpload= await cloudinaryFileUpload(avatarPath);
    const imageUpload=await cloudinaryFileUpload(coverImageLocalPath);

    if(!avatarUpload){
        throw new ApiError("409","Avtar File Required");
    }


// Step 5 : Creating the User Object which will be Uploading the file 
   const user =await User.create({
        fullName,
        avatar:avatarUpload.url,
        coverImage:imageUpload?.url || " ",
        email,
        password,
        username:username.toLowerCase()
    })

    // Step 6 : Check whether the user id is actually created or not 
        const userData=await User.findById(user._id).select(    // This is for not selecting the password and refereshToken
            "-password -refershTokem "
        );
        if(!userData){
            throw new ApiError("500","Somethings Went Wrong While Registrations");
        }

// After Sucess send The API Response: 
        return res.status(201).json(
            new apiResponse(200,userData,"User Registered")
        )

    });
export default registerUser;