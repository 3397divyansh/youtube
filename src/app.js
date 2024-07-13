import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app=express()


 app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
 }))

//configuring json and url files to et data from them
app.use(express.json({
    limit:"16kb"
 }));

 app.use(express.urlencoded({
    extended:true,//obj ki andar obj 
    limit:"16kb"
 }));

 app.use(express.static("public"))
 app.use ( cookieParser()) ///helps in data from server to cookie or web browser





 //routes

 import userRouter from './routes/user.routes.js'

 //route declaration 

 app.use("/api/v1/users",userRouter)

//http://localhost:8000/api/user/register
// register from useer routes


app.use((req, res, next) => {
   console.log(`${req.method} ${req.url}`);
   next();
});



 export   {app}















// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"

// const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())

// import userRouter from './routes/user.routes.js'

// app.use("/api/v1/users", userRouter)

// export { app }