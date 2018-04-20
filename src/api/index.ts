import Api from 'httpApi';
import { Inject } from 'vue-class-state';

export const API = 'api';
export const IApi = Inject(API);
export type IApi = Api;

export {
    Api
};
