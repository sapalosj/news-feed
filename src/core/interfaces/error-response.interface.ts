import ErrorCode from '@/core/enums/error-code.enum'
interface IErrorResponse {
    message: string,
    errorCode : ErrorCode
}

export default IErrorResponse