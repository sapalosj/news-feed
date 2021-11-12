import ErrorCode from '../enums/error-code.enum';
import IErrorResponse from '../interfaces/error-response.interface';

const errorResponse = (message: string) => {
    const response: IErrorResponse = {
        message,
        statusBool:false
    };
    return response;
};

export default errorResponse;
