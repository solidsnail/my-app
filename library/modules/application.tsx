// library/modules/application.tsx
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
  Deno.serve({ port }, app.fetch);

  const isDev = Deno.env.get("DENO_ENV") !== "production";
  if (isDev) {
    let reloadDebounce: number | null = null;
    const watcher = Deno.watchFs(["./src", "./library"]);

    (async () => {
      for await (const event of watcher) {
        if (event.kind === "modify" || event.kind === "create") {
          const hasRelevantChange = event.paths.some(
            (p) => p.endsWith(".tsx") || p.endsWith(".ts")
          );
          if (hasRelevantChange) {
            if (reloadDebounce) {
              clearTimeout(reloadDebounce);
            }
            reloadDebounce = setTimeout(() => {
              console.log("🔄 Files changed, restart server to apply changes");
              reloadDebounce = null;
            }, 150);
          }
        }
      }
    })();
  }

  console.log(`🚀 Server running at http://localhost:${port}`);
  if (isDev) {
    console.log(`🔥 Dev mode enabled - watching for changes`);
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
