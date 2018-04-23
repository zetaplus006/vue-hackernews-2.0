import Vue from 'vue';
import Component from 'vue-class-component';
import * as styles from './app.less';

@Component
export class App extends Vue {

  render() {
    return (
      <div id='app' class={styles.home}>
        <transition name='fade' mode='out-in' >
          <router-view class='view' > </router-view>
        </transition>
      </div>
    );
  }
}
