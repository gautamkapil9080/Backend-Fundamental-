import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import dotenv from "dotenv"
dotenv.config();


 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARYNAME, 
        api_key: process.env.CLOUDINARYAPIKEY, 
        api_secret: process.env.CLOUDINARYAPISECRET // Click 'View API Keys' above to copy your API secret
    });


// Creating Cloudindary file Upload system: 
const cloudinaryFileUpload=async(localFilePath)=>{
    try{
        if(!localFilePath) return null; // There is nothings
        const SuceessFileResponse=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        fs.unlinkSync(localFilePath);
        // console.log("File Uploaded",SuceessFileResponse);
        return SuceessFileResponse;
    }
    catch(error){
        // If the error is occur return false and remove from the tempLocalFile Path
        fs.unlinkSync(localFilePath) // Removing From the tempLocalFile
        return null;
    }
}
export {cloudinaryFileUpload};



