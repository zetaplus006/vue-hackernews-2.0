import { IPrueCtx, prueComponent } from '@/core';

export interface IPrueProps {
  text: string;
}

export const Prue = prueComponent<IPrueProps>({
  functional: true,
  render(h: any, ctx: IPrueCtx<IPrueProps>) {
    return <p>{ctx.props.text}</p>;
  }
});
