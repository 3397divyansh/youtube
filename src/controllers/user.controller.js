import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"

import { User} from "../models/user.models.js"

import {uploadOnCloudinary} from "../utils/cloudinary.js"

import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessAndRefreshTokens=async(userId)=>{
    try{
        const user =await User.findById(userId)
        const accessToken= user.generateAccessToken()
       const refreshToken= user.generateRefreshToken()

       user.refreshToken=refreshToken
       await user.save({vlidateBeforSave:false})

        return ({accessToken,refreshToken})

    }
    catch(error){
        throw new ApiError(500,"went wrong while geeenerating tokens")
}
}

const registerUser =asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    console.log("fghg");


    const {fullName, email, username, password } = req.body
    console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

   const existedUser= await User.findOne({
        $or :[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email hai pehle see")
    }
   const avatarLocalPath= req.files?.avatar[0]?.path ;
   const coverImageLocalPath= req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400,"no avatar mila 4")
   }

   const avatar=await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary( coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400,"no avatar mila")
   }

  const user=await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage.url  || "",
    email,
    username:username.toLowerCase(),
     password
   })

   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500,"something went wrogn while creating user")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"usr register successfully")
   )




})





const loginUser=asyncHandler(async(req,res)=>{
    //req body ->data
    //username or email 
    // find the user 
    // password check
    // acccces and refresh toekn genereate 
    //send cookie  in browser


    const {email,username,password} = req.body

        if(!username || !email){
            throw new ApiError(400,"usernmae or email req")
        }

       const user = User.findOne({
            $or:[{username},{email}]
        })
if(!user){
    throw new ApiError(404,"usern not exist")
}
// diff btw user(what u got after finding) and User (mongo object )
const isPasswordValid=await user.isPasswordCorrect(password)

if(!isPasswordValid){
    throw new ApiError(401,"invlaid password")
}

const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)



 const loggedInUser=await User.findById(user._id) .select("-password -refreshToken")


 const options={
    httpOnly:true,//server modifiable not from frontend
    secure:true
 }

 return res.status(200).cookie("accessToken",accessToken,options)
 .cookie("refreshtoken",refreshToken,options)


 .json(new ApiResponse(200),{
      user:loggedInUser,accessToken,refreshToken
 },

"user logged in successfully"
)



})




const logoutuser=asyncHandler(async(req,res)=>{
    User.findByIdAndUpdate(
    req.user._id,
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
    httpOnly:true,//server modifiable not from frontend
    secure:true
 }

 return res
 .status(200)
 .clearCookie("accessToken", options)
 .clearCookie("refreshToken", options)
 .json(new ApiResponse(200, {}, "User logged Out"))

     


})




export {registerUser,loginUser,logoutuser}