
import { IHttpApi } from './api.interface';

export default class Api implements IHttpApi {
    async getData() {
        return [
            {
                text: 'from client'
            },
            {
                text: 'from client'
            },
            {
                text: 'from client'
            }
        ];
    }
}
