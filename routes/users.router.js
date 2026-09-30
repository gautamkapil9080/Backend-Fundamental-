import Router from "express"
import registerUser from "../Controller/user.controller.js"
import {loginUser,logOut} from "../Controller/loginUser.controller.js"
import auth from "../middleware/auth.js"
import {upload} from "../middleware/multer.middleware.js"
// Importing the multer middleware from the multer.middleware.js



const routerUser=Router();
// When user click in the user/register then registerUser will run here. 
routerUser.route("/register").get(registerUser);

routerUser.route("/register").post(     // Uploads is the  middleware before the controllers.
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },

        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser);
 routerUser.route("/login").post(loginUser);
 
 routerUser.route("/logout").get(auth,logOut);


export   default routerUser; 
