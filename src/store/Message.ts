
import { Getter, Inject, Mutation, State } from 'vue-class-state';
import { IApi } from '../api/index';
export const MESSAGE = 'message';

export const IMessage = Inject(MESSAGE);

export type IMessage = Message;

export class Message {

    @State list: IMessageItem[] = [];

    @State searchList: IMessageItem[] = [];

    @Getter get len() {
        return this.list.length;
    }

    @IApi api!: IApi;

    async initData() {
        const data = await this.api.getData();
        Mutation.commit(this, () => {
            this.list = this.list.concat(data);
        }, 'initData');
    }

    async loadMore() {
        const data = await this.api.getData();
        this.addMore(data);
    }

    @Mutation addMore(data: IMessageItem[]) {
        this.list = this.list.concat(data);
    }

    searchByWord(word: string) {
        const reg = new RegExp(word, 'i');
        Mutation.commit(this, () => {
            this.searchList = this.list.filter(item => reg.test(item.text));
        }, 'search');
    }
}

export interface IMessageItem {
    text: string;
}
