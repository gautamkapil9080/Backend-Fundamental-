import express from "express"
import cookieParser from "cookie-parser"
import cros from "cors"
const app=express();

app.use(cros({
    origin:process.env.CROS_LINK,
    credential:true
}))

app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended:true})); 
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import 
import routerUser from "../routes/users.router.js"

// Routes Intilaises

app.use("/api/v1/users",routerUser); // When we click in the users then it will take routeUser router


export { app };

