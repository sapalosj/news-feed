import environment from "@/environment/environment";
import IApiRequest  from "@/core/interfaces/api.interface";


export function api (request: IApiRequest) : Promise<Response>  {

    if(request.method == 'GET'){
        return fetch(
            `${environment.baseUrl}/${request.url}`,{
                method: request.method,
                headers:{
                    'Content-type' : 'application/json'
                }
            }
        );
    }
    return fetch(
        `${environment.baseUrl}/${request.url}`,{
            method: request.method,
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify(request.data)
        }
    );
}