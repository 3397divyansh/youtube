import { Router } from "express";
 const router =Router()
 import {loginUser, logoutuser, registerUser   } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
 import { upload } from "../middlewares/multer.middleware.js";
  
router.route("/register").post(
    
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

    
    
    
    registerUser)

router.route("/login").post(loginUser)

//secured routes

router.route("/logout").post(verifyJWT,logoutuser)//next tells to go to logoutuser from verifyJwt




 export default router