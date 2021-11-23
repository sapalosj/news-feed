import {ref} from 'vue';
import IPost from '@/core/interfaces/post.interface';
import IErrorResponse from '@/core/interfaces/error-response.interface'
import HttpRequest from '@/core/enums/api.enum';
import {api} from '@/core/composables/api-client';
import ErrorCode from '@/core/enums/error-code.enum';
import errorResponse from '@/core/helpers/error-response';
import ErrorMessage from '@/core/enums/error-message.enum';

const usePostFetchAll = () => {
    const postLists  = ref<IPost[]>([])
    const error = ref<IErrorResponse>()

    const fetchPosts = async () => {
        try{
            let data  = await api({
                method:HttpRequest.GET,
                url: 'posts',
                data:''
            })
            postLists.value = await data.json()
        }
        catch{
            error.value = errorResponse(ErrorMessage.INTERNAL_SERVER_ERROR,false,ErrorCode.INTERNAL_SERVER_ERROR)
        }
    }

    return{postLists,error,fetchPosts}
}

export default usePostFetchAll