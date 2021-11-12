import HttpRequest from '@/core/enums/api.enum'

interface IApiRequest {
  method: HttpRequest;
  url: string;
  // We want to accept any data type here to make this generic.
  data?: any;
}
export default IApiRequest