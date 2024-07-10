// const asyncHandler=(requestHandler
// )=>{
//     (req,res,next=>{
//         Promise.resolve(
//             requestHandler(req,res,next)
//         ).catch((err)=>next(err))
//     })
// }



// export {asyncHandler}


//higher oerder funv=ctons that accept functions as parameters

// const asyncHandler=(fn)=>{async()=>{}} this is same as next 

const asyncHandler=(fn)=>async(req,res,next)=>{

    try{ 
        await fn(req,res,next)

    }
    catch(error){ 
        res.status(err.code || 500 ).json({
            success:false,
            message:err.message
        })

    }
}

