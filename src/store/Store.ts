
import { Inject } from 'vue-class-state';
import { IMessage } from './Message';
import { IRoute } from './route';
import { IUserInfo } from './UserInfo';

export const STORE = 'store';

export const IStore = Inject(STORE);

export type IStore = Store;

export class Store {

    @IRoute route!: IRoute;

    /**
     * 服务端渲染需要用到的state都注入到构造器里
     */
    constructor(
        @IUserInfo public userinfo: IUserInfo,
        @IMessage public message: IMessage
    ) {

    }

}
