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
  const tsxFiles = getAllTsxFiles(pagesDir);
  return tsxFiles;
};

type ApplicationOptionsType = {};
export const createApplication = (options: ApplicationOptionsType) => {
  const app = new Hono();
  app.use(async (c, next) => {
    await next();
    console.log(c.res.status, c.req.url);
    switch (c.res.status) {
      case 200:
        {
        }
        break;

      case 404:
        break;
      default:
        break;
    }
  });
  const pagesUrls = getPagesUrls();
  for (const pageUrl of pagesUrls) {
    import(pageUrl);
  }
  return app;
};
