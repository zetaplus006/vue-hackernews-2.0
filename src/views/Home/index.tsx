
import { OneLine } from '@/components/Line';
import { IMessage } from '@/store/Message';
import { IStore } from '@/store/Store';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Prue } from '../../components/Pure/index';
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

  goToUser() {
    this.$router.push({
      path: '/user'
    });
  }

  render() {
    return (
      <div class={styles.home} >
        <button onClick={this.goToUser}>go to user</button>
        {/* <router-link to='/user'>go to user</router-link> */}
        <input type='text' v-model={this.word} onInput={this.onInput} />
        <Prue text={this.word}></Prue>
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

  static serverCacheKey = (props: any) => props.text;

}
