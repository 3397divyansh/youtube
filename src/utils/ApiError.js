class ApiError extends Error
{

    constructor(

        statusCode,
        message="some thing wnent wrong ",
        error=[],
        stack=""
    )
    {
        super (message)
this.statusCode = statusCo
this.data = null
this.message = message
this .success
= false;
this.errors =
errors
if (stack) 
this.stack = stack
else{
 Error.captureStackTrace(this,this.constructor)
    }
}
}