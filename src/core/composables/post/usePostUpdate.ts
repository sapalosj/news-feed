import IPost from '@/core/interfaces/post.interface';
import { DateHelper } from '@/core/helpers/date-helper';
import IErrorResponse from '@/core/interfaces/error-response.interface'
import HttpRequest from '@/core/enums/api.enum';
import {api} from '@/core/composables/api-client';
import errorResponse from '@/core/helpers/error-response';
import messageResponse from '@/core/helpers/message-response';
import IMessageResponse from '@/core/interfaces/message-response.interface';
import {Ref, ref} from 'vue'


const usePostUpdate = async (form: Ref<IPost>) : Promise<{response: Ref<IMessageResponse | undefined>; error: Ref<IErrorResponse | undefined>}> => {

    const response = ref<IMessageResponse>()
    const error = ref<IErrorResponse>()
   
    const updatePost = async () => {
        const post : IPost = {
            title : form.value.title,
            author : form.value.author,
            content: form.value.content,    
            date : DateHelper.getCurrentDate(),
            tags : form.value.tags
        }
        try {
            const res = await api({
                method:HttpRequest.PATCH,
                url: `posts/${form.value.id}`,
                data:post
            })
            if(!res.ok){
                throw errorResponse(res.statusText,res.status)
            }
            response.value = messageResponse('Success!','Post Updated')
        } catch(err) {
           error.value = err as IErrorResponse
        }
    }

    await updatePost()

    return{response, error }
}

export default usePostUpdate