// src/index.tsx
import { createApplication } from "../library/modules/application.tsx";

const app = createApplication({});

Deno.serve({ port: 3000 }, app.fetch);

const isDev = Deno.env.get("DENO_ENV") !== "production";
if (isDev) {
  const clients = new Set<WebSocket>();
  let reloadDebounce: number | null = null;

  Deno.serve({ port: 3001 }, (req) => {
    if (req.headers.get("upgrade") !== "websocket") {
      return new Response(null, { status: 501 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);

    socket.addEventListener("open", () => {
      clients.add(socket);
      console.log("🔌 HMR client connected");
    });

    socket.addEventListener("close", () => {
      clients.delete(socket);
      console.log("🔌 HMR client disconnected");
    });

    return response;
  });

  const watcher = Deno.watchFs(["./src", "./library"]);

  (async () => {
    for await (const event of watcher) {
      if (event.kind === "modify" || event.kind === "create") {
        const hasRelevantChange = event.paths.some(
          (p) => p.endsWith(".tsx") || p.endsWith(".ts")
        );

        if (hasRelevantChange) {
          // Debounce multiple file system events
          if (reloadDebounce) {
            clearTimeout(reloadDebounce);
          }

          reloadDebounce = setTimeout(() => {
            console.log("🔄 Files changed:", event.paths);

            clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: "reload" }));
              }
            });

            reloadDebounce = null;
          }, 150); // Wait 150ms for file system to settle
        }
      }
    }
  })();
}

console.log("🚀 Server running at http://localhost:3000");
if (isDev) {
  console.log("🔥 HMR enabled on ws://localhost:3001");
}

export { app };
