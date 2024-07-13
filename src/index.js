
// require ('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import express from "express";
 import {app} from "./app.js"
// const app=express()

import connectDB from "./db/index.js" 

dotenv.config({
    path:'./.env'
})
// connectDB()
connectDB().then( ()=>{

    app.on("error" ,(error)=>{
        console.log("error mee",error);
        throw error;
       }),

    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running ${process.env.PORT}`)
    })
}
).catch(
    (err)=>{
        console.log("mogo failed bhai",err)
        process.exit(1)
    }
)






















// import mongoose from "mongoose"
// import {DB_NAME} from "./constants"
// import express from "express"
// import { DB_NAME } from "./constants.js"
// const app=express()
 
// ;(async()=>{

//     try{
//        await  mongoose.connect(`${process.env.MONGODB_URI} /${DB_NAME}`)

//        app.on("error" ,(error)=>{
//         console.log("error",error);
//         throw error;
//        })

//        app.listen(process.env.PORT,()=>{
//         console.log(`app is listening on port ${process.env.PORT}`)
//     })
//     }

  
//     catch(error){
//         console.error("error",error)
//         throw error
//     }
// })()