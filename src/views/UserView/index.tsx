import { IUserInfo } from '@/store/UserInfo';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class UserView extends Vue {
    @IUserInfo userInfo!: IUserInfo;

    render() {
        return <h2>{this.userInfo.name}</h2>;
    }
}
