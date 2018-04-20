
import { OneLine } from '@/components/Line';
import { IMessage } from '@/store/Message';
import { IStore } from '@/store/Store';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as styles from './style.less';

@Component
export default class Home extends Vue {

  @IMessage message!: IMessage;

  word = '';

  get isShowSearch() {
    return this.word.length > 0;
  }

  get showList() {
    return this.isShowSearch ? this.message.searchList : this.message.list;
  }

  onInput() {
    this.message.searchByWord(this.word);
  }

  render() {
    return (
      <div class={styles.home} >
        <input type='text' v-model={this.word} onInput={this.onInput} />
        <p>{this.word}</p>
        {!this.isShowSearch && <button onClick={() => this.message.loadMore()}>loadmore</button>}
        {
          this.showList.map(item => <OneLine text={item.text}></OneLine>)
        }
      </div>
    );
  }

  static asyncData(store: IStore) {
    return store.message.initData();
  }

}