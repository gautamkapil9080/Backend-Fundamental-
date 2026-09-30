import mongoose from "mongoose"
import mongooseAggergatePagenate from "mongoose-paginate-v2"
const videoSchema=new mongoose.Schema({
    videoFile:{
        type:String, // Cloudinary Url
        required:true
    },
     thumbnail:{
        type:String, // Cloudinary Url
        required:true
    },
    owner:{
        type:mogoose.Schema.Types.objectId,
        ref:"User"
    },
     title:{
        type:String, // Cloudinary Url
        required:true
    },
     description:{
        type:String, 
        required:true
    },
    duration:{      // Durations
        type:Number,
        required:True,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        required:True
    },
    createdAt:{
        type:Date,
    },
    updatedAt:{
        type:Date
    }
},{timeStamp:true});

videoSchema.plugin(mongooseAggergatePagenate)

export const Video=mongoose.model("Video",VideoSchema);