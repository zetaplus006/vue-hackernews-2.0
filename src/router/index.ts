import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    // scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/home', component: () => import('../views/Home') },
      { path: '/user', component: () => import('../views/UserView') },
      { path: '/', redirect: '/home' }
    ]
  });
}
