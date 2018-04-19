
import { IHttpApi } from './api.interface';


export default class Api implements IHttpApi {
    getData() {
        return new Promise(r => {
            setTimeout(() => {
                r('server ----------')
            }, 20);
        })
    }
}