import {Ref,ref} from 'vue';
import IPost from '@/core/interfaces/post.interface';
import IErrorResponse from '@/core/interfaces/error-response.interface'
import HttpRequest from '@/core/enums/api.enum';
import {api} from '@/core/composables/api-client';
import errorResponse from '@/core/helpers/error-response';


const usePostFetchAll = (): {postLists: Ref<IPost[]>; error: Ref<IErrorResponse | undefined>; fetchPosts: () => Promise<void>} => {
    
    const postLists  = ref<IPost[]>([])
    const error = ref<IErrorResponse>()

    const fetchPosts = async () => {
        try{
            const data  = await api({
                method:HttpRequest.GET,
                url: 'posts',
                data:''
            })
            if(!data.ok){
                throw errorResponse(data.statusText,data.status)
            }
            postLists.value = await data.json()
        }
        catch(err){
            error.value = err as IErrorResponse
        }
    }

    return{postLists,error,fetchPosts}
}

export default usePostFetchAll