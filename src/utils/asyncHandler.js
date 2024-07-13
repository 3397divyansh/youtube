const asyncHandler=(requestHandler
)=>{
   return  (req,res,next)=>{
        Promise.resolve(
            requestHandler(req,res,next)
        ).catch((err)=>next(err))
    }
}



export  {asyncHandler}


//higher oerder funv=ctons that accept functions as parameters

// const asyncHandler=(fn)=>{async()=>{}} this is same as next 

// const asyncHandler=(fn)=>async(req,res,next)=>{

//     try{ 
//         await fn(req,res,next)

//     }
//     catch(error){ 
//         res.status(err.code || 500 ).json({
//             success:false,
//             message:err.message
//         })

//     }
// }

// Using an asyncHandler function like this one ensures that asynchronous route handlers in your Express.js application handle errors gracefully and provide consistent error responses to the client. It simplifies the error-handling logic and keeps your code clean and maintainable.