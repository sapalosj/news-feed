import {api} from '@/core/api.service';
import IPost from '../interfaces/post.interface';
import HttpRequest from '../enums/api.enum';
import ErrorCode from '../enums/error-code.enum';
import ErrorMessage from '../enums/error-message.enum';
import messageResponse from '../helpers/message-response';
import IMessageResponse from '../interfaces/message-response.interface';
import IErrorResponse from '../interfaces/error-response.interface';
import errorResponse from '../helpers/error-response';


const fetchAll = async ()  => {
    return await api({
        method:HttpRequest.GET,
        url: 'posts',
        data:''
    })
}  

const fetchPostById = async (id:any) => {
    return await api({
        method:HttpRequest.GET,
        url:`posts/${id}`
    })
}


const insertPost = async (requestBody : IPost) : Promise<IMessageResponse | IErrorResponse> =>{
     return await api({
        method: HttpRequest.POST,
        url: 'posts',
        data: requestBody
    }).then(() =>  {
        return messageResponse('Successfully Created')
    }).catch((err)=>{
        const error:Error = err as Error;
        return errorResponse(error.message);
    });
}


const updatePost = async (id:any,requestBody:any) => {
    return await api({
        method:HttpRequest.PATCH,
        url: `posts/${id}`,
        data:requestBody
    }).then(() =>  {
        return messageResponse('Successfully Updated')
    }).catch((err)=>{
        const error:Error = err as Error;
        return errorResponse(error.message);
    });
}

const deletePost = async (id:number) : Promise<IMessageResponse | IErrorResponse> =>{
    return await api({
       method: HttpRequest.DELETE,
       url: `posts/${id}`
   }).then(() =>  {
       return messageResponse('Successfully Deleted')
   }).catch((err)=>{
       const error:Error = err as Error;
       return errorResponse(error.message);
   });
}


export const PostService = {
    fetchAll,
    fetchPostById,
    insertPost,
    updatePost,
    deletePost
};

