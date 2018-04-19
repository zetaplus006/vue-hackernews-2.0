
import Vue from "vue";
import { Component } from 'vue-property-decorator'
import { Api } from '../api';
import { OneLine } from '../components/Line';
import { IStore } from '../store/Store';
import * as styles from './Home.less'

@Component
export default class Home extends Vue {

  @IStore store: IStore

  text = 'ok'
  render() {

    return <div class={styles.home}>
      {
        this.store.message.list.map(item => <OneLine text={item.text}></OneLine>)
      }
      {/* <OneLine text={this.text}></OneLine> */}
    </div>
  }

  static asyncData(store: IStore) {
    return store.message.addAction();
  }

}
