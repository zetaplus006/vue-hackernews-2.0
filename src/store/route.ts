import { Inject, Mutation, State } from 'vue-class-state';
import Router from 'vue-router';

export const ROUTE = 'route';
export const IRoute = Inject(ROUTE);
export type IRoute = Route;
export class Route {
    @State state = {};

    router!: Router;

    setRouter(router: Router) {
        this.router = router;
        this.router.beforeResolve((to: any, from: any, next: () => any) => {
            Mutation.commit(this, () => this.state = cloneRoute(to, from), 'sync_route');
        });
    }

}

/**
 * copy from https://github.com/vuejs/vuex-router-sync/blob/master/src/index.js#L60
 * @param to
 * @param from
 */
export function cloneRoute(to: any, from?: any) {
    const clone = {
        name: to.name,
        path: to.path,
        hash: to.hash,
        query: to.query,
        params: to.params,
        fullPath: to.fullPath,
        meta: to.meta
    };
    if (from) {
        (clone as any).from = cloneRoute(from);
    }
    // return Object.freeze(clone);
    return clone;
}
