import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './main'
import { State } from 'vue-class-state';

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData(
        this.$store,
        to
      ).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

function replaceAllState(clientStore, serverStore) {
  Object.keys(clientStore).forEach(key => {
    State.replaceState(clientStore[key], serverStore[key] || {})
  })
}

const key = '__INITIAL_STATE__'

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window[key]) {
  replaceAllState(store, window[key])
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    // TODO asyncData type
    const asyncDataHooks = activated.map(c => (c as any).asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
// if ('https:' === location.protocol && navigator.serviceWorker) {
//   navigator.serviceWorker.register('/service-worker.js')
// }


