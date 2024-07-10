class ApiError extends Error
{

    constructor(

        statusCode,
        message="some thing wnent wrong ",
        error=[],
        statck=""
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
if (statck) 
this.stack = statck
else{
 Error.captureStackTrace(this,this.constructor)
    }
}
}