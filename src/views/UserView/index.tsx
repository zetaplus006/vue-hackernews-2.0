import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IUserInfo } from '../../store/UserInfo';

@Component
export default class UserView extends Vue {
    @IUserInfo userInfo!: IUserInfo;

    mounted() {
        // if (!this.userInfo.ws) {
        //     this.userInfo.initClient();
        // }
    }

    render() {
        return <h2>{this.userInfo.name}</h2>;
    }
}
