
import { State, Inject } from 'vue-class-state'
import { IUserInfo } from './UserInfo';
import { IMessage } from './Message';

export const STORE = 'store';

export const IStore = Inject(STORE)

export type IStore = Store

export class Store {
    /**
     * 服务端渲染需要用到的state都注入到构造器里
     */
    constructor(
        @IUserInfo public userinfo: IUserInfo,
        @IMessage public message: IMessage
    ) {

    }

}
