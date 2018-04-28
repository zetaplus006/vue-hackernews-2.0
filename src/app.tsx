import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as styles from './app.less';
import Test2 from './views/test.vue';

@Component({
})
export class App extends Vue {

  render() {
    return (
      <div id='app' class={styles.view}>
        <Test2></Test2>
        <transition name='fade' mode='out-in' >
          <router-view class='view' > </router-view>
        </transition>
      </div>
    );
  }
}

// tslint:disable-next-line:no-debugger
// tslint:disable-next-line:no-console
// console.log(Object.keys(Test2), '\n', Test2, '\n', Test2['__inject__']);
