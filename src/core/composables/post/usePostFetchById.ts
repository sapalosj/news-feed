import {ref,reactive} from 'vue';
import IPost from '@/core/interfaces/post.interface';
import IErrorResponse from '@/core/interfaces/error-response.interface'
import HttpRequest from '@/core/enums/api.enum';
import {api} from '@/core/composables/api-client';
import ErrorCode from '@/core/enums/error-code.enum';
import errorResponse from '@/core/helpers/error-response';
import ErrorMessage from '@/core/enums/error-message.enum';

const usePostFetchById = () => {
  
    const post  = ref <IPost>({
        title:'',
        author:'',
        content:'',
        date:''
    });

    const modalContent = reactive <IPost>({
        title: '',
        author:'',
        content:'',
        date:''
    })


    const error = ref<IErrorResponse>()
  
    const fetchPostById = async (id:number) => {
        try{
            let data = await api({
                method:HttpRequest.GET,
                url:`posts/${id}`
            })

            let result = await data.json()
            post.value = result;
            modalContent.id = result.id
            modalContent.title = result.title
            modalContent.author = result.author
            modalContent.content = result.content
            modalContent.date = result.date
        }
        catch{
            error.value = errorResponse(ErrorMessage.INTERNAL_SERVER_ERROR,false,ErrorCode.INTERNAL_SERVER_ERROR)
        }
    }

    return{post,error,modalContent,fetchPostById}
}

export default usePostFetchById