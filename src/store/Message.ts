
import { Inject, Mutation, State } from 'vue-class-state';
export const MESSAGE = 'message';

export const IMessage = Inject(MESSAGE);

export type IMessage = Message;

export class Message {
    @State list = [];

    addAction() {
        return new Promise(r => {
            setTimeout(() => {
                this.add();
                r({});
            }, 30);
        });
    }

    @Mutation
    add() {
        this.list = [{
            text: 'hello'
        }, {
            text: 'hello'
        }, {
            text: 'hello'
        }];
    }
}
