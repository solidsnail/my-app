import { createApi } from "../../library/modules/api.tsx";
import { app } from "../index.tsx";

let count = 0;

createApi({
  name: "counter",
  app,
  routes: {
    "/count": {
      type: "get",
      handler: (c) => {
        return c.json(count);
      },
    },
    "/increment": {
      type: "post",
      handler: (c) => {
        count++;
        return c.json(count);
      },
    },
    "/decrement": {
      type: "post",
      handler: (c) => {
        count--;
        return c.json(count);
      },
    },
    "/reset": {
      type: "post",
      handler: (c) => {
        count = 0;
        return c.json(count);
      },
    },
  },
});
