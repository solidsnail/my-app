// library/modules/application.tsx

import { Hono } from "hono";
import { statSync, readdirSync } from "fs";
import { join } from "path";

function getAllTsxFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      getAllTsxFiles(filePath, fileList);
    } else if (file.endsWith(".tsx")) {
      fileList.push(filePath);
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

type ApplicationOptionsType = {
  behaviors?: Record<string, any>;
};

export const createApplication = (options: ApplicationOptionsType) => {
  const app = new Hono();
  app.behaviors = options.behaviors;
  app.use(async (c, next) => {
    await next();
    const status = c.res.status;
    console.log(
      `[${new Date().toISOString()}] ${status} ${c.req.method} ${c.req.url}`
    );
  });

  // Auto-register pages
  const pagesUrls = getPagesUrls();
  for (const pageUrl of pagesUrls) {
    import(pageUrl);
  }

  return app;
};
