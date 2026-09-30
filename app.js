
import dotenv from "dotenv";
dotenv.config();

import db_Connection from "./db/connections.js"
import {app} from "./utils/index.js";


db_Connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Listenning at ",process.env.PORT);
    })
})
.catch((error)=>{
    console.log("Error is Happening");
});





