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

type ApplicationOptionsType = {};

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

  return app;
};
