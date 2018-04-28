import { Prop } from 'vue-property-decorator';
import { ofType } from 'vue-tsx-support';

export { Component as VueType, ofType } from 'vue-tsx-support';

export const Input = Prop();

export interface IPureCtx<PropType> {
    props: PropType;
    children: any;
    slots: () => any;
    listeners: any;
}

export function pureComponent<TProps, TEvents = {}, TScopedSlots = {}>(c: any) {
    return ofType<TProps, TEvents, TScopedSlots>().convert(c);
}

// export declare function ofType<TProps, TEvents = {}, TScopedSlots = {}>(): Factory<TProps, TEvents, TScopedSlots>;

export function lazyValue(initializer: (ctx: any) => any): any;
export function lazyValue(target: any, key: PropertyKey): any;
export function lazyValue(targetOrFn: any, key?: PropertyKey): any {
    if (typeof targetOrFn === 'function') {
        return function (target: any, _key: PropertyKey) {
            return definedGetter(target, _key, targetOrFn);
        };
    } else {
        const get = Object.getOwnPropertyDescriptor(targetOrFn, key!)!.get!;
        return definedGetter(targetOrFn, key!, get);
    }
}

export function definedGetter(target: any, key: PropertyKey, get: (...args: any[]) => any) {
    return {
        get() {
            const value = get.call(this, this);
            Object.defineProperty(this, key, {
                value,
                enumerable: true,
                configurable: true,
                writable: true
            });
            return value;
        },
        enumerable: true,
        configurable: true
    };
}

let i = 1;
export class Test {
    a = '1234';

    @lazyValue(function (ctx: Test) {
        // tslint:disable-next-line:no-console
        console.log('678');
        return ctx.a + i++;
    })
    val!: string;

    @lazyValue
    get lazyVal() {
        return this.a + 1111;
    }
}

// tslint:disable-next-line:no-console
console.log(new Test());
