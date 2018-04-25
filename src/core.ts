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
