
import IMessageResponse from "../interfaces/message-response.interface"

const messageResponse = (message:string,status:boolean) : IMessageResponse =>{
    const response = {
        message,
        status
    }
    return response
}

export default messageResponse