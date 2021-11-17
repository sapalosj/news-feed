import ErrorCode from '@/core/enums/error-code.enum'
interface IErrorResponse {
    message: string,
    status: boolean,
    errorCode : ErrorCode
}

export default IErrorResponse