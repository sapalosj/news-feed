
import IMessageResponse from "../interfaces/message-response.interface"

const messageResponse = (message:string) =>{
    const response : IMessageResponse = {
        message,
        statusBool:true
    }
    return response
}

export default messageResponse