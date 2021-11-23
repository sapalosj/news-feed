import IPost from '@/core/interfaces/post.interface';
import { DateHelper } from '@/core/helpers/date-helper';
import IErrorResponse from '@/core/interfaces/error-response.interface'
import HttpRequest from '@/core/enums/api.enum';
import {api} from '@/core/composables/api-client';
import ErrorCode from '@/core/enums/error-code.enum';
import errorResponse from '@/core/helpers/error-response';
import ErrorMessage from '@/core/enums/error-message.enum';
import messageResponse from '@/core/helpers/message-response';
import IMessageResponse from '@/core/interfaces/message-response.interface';

const usePostDelete = () => {
   
    const deletePost = async (id:number) : Promise<IMessageResponse|IErrorResponse> => {
        try {
            await api({
                method: HttpRequest.DELETE,
                url: `posts/${id}`
            })
            return messageResponse('Post Updated',true)
        } catch {
            return errorResponse(ErrorMessage.INTERNAL_SERVER_ERROR,false,ErrorCode.INTERNAL_SERVER_ERROR)
        }
    }

    return{deletePost}
}

export default usePostDelete