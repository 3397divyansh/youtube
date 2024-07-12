import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB=async()=>{
    try{
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI} / ${
            DB_NAME}`)

            console.log(`\n mongodb conneccted bhaii,${connectionInstance.connection.host} `);

    } 
    catch(error){

        console.log("mongo error ho gaya ",error);
        

    }
}
export default connectDB