class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        error=[],
        stack="",
    ){
        super(message);
        this.statusCode=statusCode
        this.data=null
        this.success=false
        this.error=error
        this.stack = stack;
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            data: this.data,
            success: this.success,
            message: this.message, 
            error: this.error
        };
    }
}

export {ApiError}