import { Context, Hono } from "hono";
import { BlankEnv, BlankInput, BlankSchema, HandlerResponse } from "hono/types";

type ApiOptionsType = {
  app: Hono<BlankEnv, BlankSchema, "/">;
  name: string;
  routes: {
    [K in string]: {
      type: "get" | "post" | "put" | "delete";
      handler: (c: Context<BlankEnv, K, BlankInput>) => HandlerResponse<any>;
    };
  };
};

export const createApi = ({ name, app, routes }: ApiOptionsType) => {
  const api = new Hono();
  for (const [route, handler] of Object.entries(routes)) {
    api[handler.type](route, handler.handler);
  }
  app.route(`/api/${name}`, api);
};
