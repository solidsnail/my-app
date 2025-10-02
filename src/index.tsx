// src/index.tsx

import { createApplication } from "../library/modules/application";

const app = createApplication({});

export default app;

// Start the server
Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log("🚀 Server running at http://localhost:3000");
