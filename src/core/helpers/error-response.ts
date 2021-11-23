import ErrorCode from '../enums/error-code.enum';
import ErrorMessage from '../enums/error-message.enum';
import IErrorResponse from '../interfaces/error-response.interface';

const errorResponse = (message: ErrorMessage,status:boolean,errorCode:ErrorCode) : IErrorResponse => {
    const response = {
        message,
        status,
        errorCode
    };
    return response;
};

export default errorResponse;
