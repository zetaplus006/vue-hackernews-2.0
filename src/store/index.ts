import { Container, bind } from "vue-class-state";
import { STORE, Store } from "./Store";
import { USERINFO, UserInfo, IUserInfo } from './UserInfo';
import { IMessage, MESSAGE, Message } from './Message';


@Container({
  providers: [
    bind<Store>(STORE).toClass(Store),
    bind<IUserInfo>(USERINFO).toClass(UserInfo),
    bind<IMessage>(MESSAGE).toClass(Message)
  ],
  strict: false
})
export class AppContainer { }