import { FC } from "hono/jsx";

type ComponentOptionsType<P> = {
  name: string;
  render: FC<P>;
};

export const createComponent = <P,>({
  name,
  render,
}: ComponentOptionsType<P>) => {
  render.displayName = name;
  return render;
};
