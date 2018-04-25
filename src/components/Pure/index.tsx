import { IPureCtx, pureComponent } from '@/core';

export interface IPureProps {
  text: string;
}

export const Prue = pureComponent<IPureProps>({
  functional: true,
  render(h: any, ctx: IPureCtx<IPureProps>) {
    return <p>{ctx.props.text}</p>;
  }
});
