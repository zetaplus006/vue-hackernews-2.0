import { IHttpApi } from './api.interface';


export default class Api implements IHttpApi {
    async getData() {
        console.log('from client')
        return 'from client'
    }
}