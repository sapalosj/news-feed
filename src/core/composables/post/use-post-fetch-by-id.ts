import {Ref,ref} from 'vue';
import IPost from '@/core/interfaces/post.interface';
import IErrorResponse from '@/core/interfaces/error-response.interface'
import HttpRequest from '@/core/enums/api.enum';
import {api} from '@/core/composables/api-client';
import errorResponse from '@/core/helpers/error-response';

const usePostFetchById = (): {post: Ref<IPost>; error: Ref<IErrorResponse | undefined>; updatePostStateById: (id: number) => Promise<void>} => {
  
    const post  = ref <IPost>({
        title:'',
        author:'',
        content:'',
        date:'',
        tags: []
    });


    const error = ref<IErrorResponse>()
  
    const updatePostStateById = async (id:number) => {
        try{
            let data = await api({
                method:HttpRequest.GET,
                url:`posts/${id}`
            })
            if(!data.ok){
                throw errorResponse(data.statusText,data.status)
            }
            let result = await data.json()
            post.value.id = result.id
            post.value.title = result.title
            post.value.author = result.author
            post.value.content = result.content
            post.value.date = result.date
            post.value.tags = result.tags
        }
        catch(err){
            error.value = err as IErrorResponse
        }
    }
    return{post,error,updatePostStateById}
}

export default usePostFetchById