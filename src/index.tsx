import { createApplication } from "../library/modules/application.tsx";

const app = createApplication({});

Deno.serve({ port: 3000 }, app.fetch);

console.log("🚀 Server running at http://localhost:3000");

export { app };
