import Vue from 'vue';
import 'vue-tsx-support/enable-check';
import { App } from './app';
import { createRouter } from './router';
// import { sync } from 'vuex-router-sync'
import { AppContainer } from './store/index';
import { STORE, Store } from './store/Store';
// mixin for handling title

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
  // create store and router instances
  const provide = new AppContainer();
  const store: Store = provide[STORE];
  const router = createRouter();

  // sync the router with the vuex store.
  // this registers `store.state.route`
  // sync(store, router)

  store.route.syncRouter(router);

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    provide,
    render: h => h(App)
  });

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store };
}
