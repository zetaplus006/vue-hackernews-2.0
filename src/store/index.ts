import { bind, Container, State } from 'vue-class-state';
import { Api, API, IApi } from '../api/index';
import { IMessage, MESSAGE, Message } from './Message';
import { IRoute, ROUTE, Route } from './route';
import { STORE, Store } from './Store';
import { IUserInfo, USERINFO, UserInfo } from './UserInfo';

State.showInject();

@Container({
  providers: [
    bind<Store>(STORE).toClass(Store),
    bind<IUserInfo>(USERINFO).toClass(UserInfo),
    bind<IMessage>(MESSAGE).toClass(Message),
    bind<IRoute>(ROUTE).toClass(Route),
    bind<IApi>(API).toClass(Api)
  ],
  strict: true
})
export class AppContainer { }
