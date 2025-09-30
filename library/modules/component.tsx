import { FC } from "hono/jsx";

type PageOptionsType<P> = {
  name: string;
  render: FC<P>;
};
export const createComponent = <P,>({ name, render }: PageOptionsType<P>) => {
  render.displayName = name;
  return render;
};
