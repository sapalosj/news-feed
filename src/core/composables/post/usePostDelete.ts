import IErrorResponse from '@/core/interfaces/error-response.interface'
import HttpRequest from '@/core/enums/api.enum';
import {api} from '@/core/composables/api-client';
import errorResponse from '@/core/helpers/error-response';
import messageResponse from '@/core/helpers/message-response';
import IMessageResponse from '@/core/interfaces/message-response.interface';
import { Ref,ref } from 'vue'

const usePostDelete = async (id:number): Promise<{response: Ref<IMessageResponse | undefined>;error: Ref<IErrorResponse | undefined>;}> =>  {
   
    const response = ref<IMessageResponse>()
    const error = ref<IErrorResponse>()

    const deletePost = async ()  => {
        try {
            const res = await api({
                method: HttpRequest.DELETE,
                url: `posts/${id}`
            })
            if(!res.ok){
                throw errorResponse(res.statusText,res.status)
            }
            response.value =  messageResponse('Removed!','Post Deleted!')
        } catch(err) {
            error.value =  err as IErrorResponse
        }
    }

    await deletePost()

    return{response, error}
}

export default usePostDelete