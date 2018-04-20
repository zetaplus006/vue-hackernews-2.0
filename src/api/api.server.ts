
import { IHttpApi } from './api.interface';

export default class Api implements IHttpApi {
    async getData() {
        return [
            {
                text: 'from server'
            },
            {
                text: 'from server'
            },
            {
                text: 'from server'
            }
        ];
    }
}
