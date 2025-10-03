import { createApplication } from "../library/modules/application";
import counterApp from "./api/counter";

const app = createApplication({});

app.route("/api/counter", counterApp);

export default app;

Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log("🚀 Server running at http://localhost:3000");
