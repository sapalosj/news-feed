import IPost from '@/core/interfaces/post.interface';
import { DateHelper } from '@/core/helpers/date-helper';
import HttpRequest from '@/core/enums/api.enum';
import {api} from '@/core/composables/api-client';
import ErrorCode from '@/core/enums/error-code.enum';
import errorResponse from '@/core/helpers/error-response';
import ErrorMessage from '@/core/enums/error-message.enum';
import messageResponse from '@/core/helpers/message-response';
import IMessageResponse from '@/core/interfaces/message-response.interface';
import IErrorResponse from '@/core/interfaces/error-response.interface';

const usePostCreate = () => {

    const insertPost = async (form,tag:string[]) : Promise<IMessageResponse|IErrorResponse> => {
        const post : IPost = {
            title : form.value.title,
            author : form.value.author,
            content: form.value.content,    
            date : DateHelper.getCurrentDate(),
            tags: tag
        }
        try{
             await api({
                method: HttpRequest.POST,
                url: 'posts',
                data: post
            })
            return messageResponse('New Post Created',true)
        }
        catch{
            return errorResponse(ErrorMessage.INTERNAL_SERVER_ERROR,false,ErrorCode.INTERNAL_SERVER_ERROR)
        }
    }

    return{insertPost}
}

export default usePostCreate