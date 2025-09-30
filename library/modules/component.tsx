// library/modules/component.tsx

import { FC } from "hono/jsx";

type ComponentOptionsType<P> = {
  name: string;
  render: FC<P>;
  behaviors?: Record<string, any>;
};

export const createComponent = <P,>({
  name,
  render,
  behaviors,
}: ComponentOptionsType<P>) => {
  // Attach behaviors to render function for access within component
  if (behaviors) {
    (render as any).behaviors = behaviors;
  }

  render.displayName = name;
  return render;
};
