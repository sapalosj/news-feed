import ErrorCode from '../enums/error-code.enum';
import IErrorResponse from '../interfaces/error-response.interface';

const errorResponse = (message: string,errorCode:ErrorCode) : IErrorResponse => {
    const response = {
        message,
        errorCode
    };
    return response;
};

export default errorResponse;
