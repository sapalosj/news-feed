
import {Ref} from 'vue'
import IErrorResponse from './error-response.interface'
import IMessageResponse from './message-response.interface'

interface IComposableResponse {
    response: Ref<IMessageResponse | undefined>,
    error: Ref<IErrorResponse | undefined>
}

export default IComposableResponse