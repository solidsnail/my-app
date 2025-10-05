import { Hono } from "hono";
import { BlankEnv, BlankSchema } from "hono/types";
import { statSync, readdirSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

function getAllTsxFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = pathToFileURL(join(dir, file));
    console.log(filePath.toString());
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      getAllTsxFiles(filePath.toString(), fileList);
    } else if (file.endsWith(".tsx")) {
      fileList.push(filePath.toString());
    }
  }
  return fileList;
}

const getPagesUrls = () => {
  const pagesDir = join(process.cwd(), "src", "pages");
  try {
    const tsxFiles = getAllTsxFiles(pagesDir);
    return tsxFiles;
  } catch (error) {
    console.warn("Pages directory not found, skipping page registration");
    return [];
  }
};
const getApiUrls = () => {
  const apiDir = join(process.cwd(), "src", "api");
  try {
    const tsxFiles = getAllTsxFiles(apiDir);
    return tsxFiles;
  } catch (error) {
    console.warn("Pages directory not found, skipping page registration");
    return [];
  }
};

const startDevServer = (
  app: Hono<BlankEnv, BlankSchema, "/">,
  options: ApplicationOptionsType
) => {
  const port = options.port || 3000;
  const hmrPort = port + 1;
  Deno.serve({ port }, app.fetch);
  const isDev = Deno.env.get("DENO_ENV") !== "production";
  if (isDev) {
    const clients = new Set<WebSocket>();
    let reloadDebounce: number | null = null;
    Deno.serve({ port: hmrPort }, (req) => {
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

  console.log(`🚀 Server running at http://localhost:${port}`);
  if (isDev) {
    console.log(`🔥 HMR enabled on ws://localhost:${hmrPort}`);
  }
};

type ApplicationOptionsType = {
  port?: number;
};

export const createApplication = (options: ApplicationOptionsType) => {
  const app = new Hono();
  app.use(async (c, next) => {
    await next();
    const status = c.res.status;
    console.log(
      `[${new Date().toISOString()}] ${status} ${c.req.method} ${c.req.url}`
    );
  });

  const pagesUrls = getPagesUrls();
  const apiUrls = getApiUrls();
  for (const pageUrl of pagesUrls) {
    import(pageUrl);
  }
  for (const apiUrl of apiUrls) {
    import(apiUrl);
  }

  startDevServer(app, options);
  return app;
};
