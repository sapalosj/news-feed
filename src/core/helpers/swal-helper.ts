import { Ref } from '@vue/reactivity';
import IMessageResponse from '@/core/interfaces/message-response.interface';
import IErrorResponse from '@/core/interfaces/error-response.interface';
import Swal from 'sweetalert2'

const showSweetAlert = (response: Ref<IMessageResponse | undefined>, error : Ref<IErrorResponse | undefined>): boolean  =>{
    if(error.value === undefined){
        Swal.fire(response.value?.title, response.value?.message,'success')
        return true
    }else{
    Swal.fire(error.value.errorCode.toString(), error.value.message,'error')
    return false
    }
}   

export default showSweetAlert