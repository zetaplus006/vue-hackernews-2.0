
import { State, Inject } from 'vue-class-state'
export const USERINFO = 'userinfo';

export const IUserInfo = Inject(USERINFO)

export type IUserInfo = UserInfo

export class UserInfo {
    @State name = 'seabook'

}
