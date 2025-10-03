import { Hono } from "hono";

const counterApp = new Hono();

let count = 0;

counterApp.post("/increment", (c) => {
  count++;
  return c.html(<>{count}</>);
});

counterApp.post("/decrement", (c) => {
  count--;
  return c.html(<>{count}</>);
});

counterApp.post("/reset", (c) => {
  count = 0;
  return c.html(<>{count}</>);
});

export default counterApp;
