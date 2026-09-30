import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config();

const db_Connection= (async()=>{
    try{
        const data=await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("Connected");
    }
    catch(error){
        console.error();
        throw error;
    }
});
export default  db_Connection;
