
import IMessageResponse from "../interfaces/message-response.interface"

const messageResponse = (title:string,message:string) : IMessageResponse =>{
    const response = {
        title,
        message
    }
    return response
}

export default messageResponse