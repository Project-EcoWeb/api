
class AppError extends Error{
    constructor(message, statusCode = 500){
        super(message);
        this.name = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;