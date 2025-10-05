// library/modules/page.tsx
import { Context, Hono } from "hono";
import { JSX } from "hono/jsx";
import { BlankEnv, BlankInput, BlankSchema } from "hono/types";
import { htmxScript } from "../htmx/index.tsx";
import { hmrScript } from "./hmr.tsx";

type PageOptionsType<P> = {
  app: Hono<BlankEnv, BlankSchema, "/">;
  seo: {
    title: string;
  };
  name: string;
  route: string;
  getServerSideProps: (c: Context<BlankEnv, "/", BlankInput>) => P;
  //@ts-expect-error Element is missing
  render: (props: P) => JSX.Element;
};

const isDev = Deno.env.get("DENO_ENV") !== "production";

export const createPage = <P,>({
  name,
  app,
  seo,
  route,
  render,
  getServerSideProps,
}: PageOptionsType<P>) => {
  app.get(route, async (c) => {
    try {
      const serverProps = getServerSideProps(c);
      const jsx = await render(serverProps);
      return c.html(
        <html>
          <head>
            <title>{seo.title}</title>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </head>
          <body>
            {jsx}
            {htmxScript()}
            {isDev && hmrScript()}
          </body>
        </html>
      );
    } catch (err) {
      const error = err as Error;
      return c.html(
        <html>
          <head>
            <title>{seo.title}</title>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </head>
          <body>
            <b>{error.message}</b>
            <i>{error.stack}</i>
          </body>
        </html>,
        500
      );
    }
  });
};
