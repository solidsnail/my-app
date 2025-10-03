import { Hono } from "hono";

const counterApp = new Hono();

let count = 0;

counterApp.get("/count", (c) => {
  return c.json(count);
});

counterApp.post("/increment", (c) => {
  count++;
  return c.json(count);
});

counterApp.post("/decrement", (c) => {
  count--;
  return c.json(count);
});

counterApp.post("/reset", (c) => {
  count = 0;
  return c.json(count);
});

export default counterApp;
