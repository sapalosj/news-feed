enum ErrorMessage {
    UNAUTHORIZED = 'UNAUTHORIZED: Invalid authentication credentials for the target resource',
    FORBIDDEN = 'FORBIDDEN: Access on the target resource not permitted',
    CONFLICT = 'CONFLICT: Request conflict with current state of the target resource',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    NOT_FOUND = 'Target resource not found'
}

export default ErrorMessage;
