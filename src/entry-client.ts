import 'core-js/es6/promise';
import 'core-js/library/es6/array';
import Vue from 'vue';
import { State } from 'vue-class-state';
import { createApp } from './main';

const { app, router, store } = createApp();
store.route.setRouter(router);
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(to, _from, next) {
    const { asyncData } = (this as any).$options;
    if (asyncData) {
      asyncData(
        store,
        to
      ).then(next).catch(next);
    } else {
      next();
    }
  }
});

function replaceAllState(clientStore: any, serverStore: any) {
  Object.keys(clientStore).forEach(key => {
    State.replaceState(clientStore[key], serverStore[key] || {});
  });
}

const statekey = '__INITIAL_STATE__';

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window[statekey]) {
  replaceAllState(store, window[statekey]);
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c));
    });
    // TODO asyncData type
    const asyncDataHooks = activated.map(c => (c as any).asyncData).filter(_ => _);
    if (!asyncDataHooks.length) {
      return next();
    }

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next();
      })
      .catch(next);
  });

  // actually mount to DOM
  app.$mount('#app');
});

// service worker
// if ('https:' === location.protocol && navigator.serviceWorker) {
//   navigator.serviceWorker.register('/service-worker.js')
// }
