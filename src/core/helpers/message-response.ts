
import IMessageResponse from "../interfaces/message-response.interface"

const messageResponse = (message:string,status:boolean) =>{
    const response : IMessageResponse = {
        message,
        status
    }
    return response
}

export default messageResponse