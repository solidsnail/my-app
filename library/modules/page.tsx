import { Context, Hono } from "hono";
import { html, raw } from "hono/html";
import { JSX } from "hono/jsx";
import { BlankEnv, BlankInput, BlankSchema } from "hono/types";

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
export const createPage = <P,>({
  name,
  app,
  seo,
  route,
  render,
  getServerSideProps,
}: PageOptionsType<P>) => {
  app.get(route, (c) => {
    const serverProps = getServerSideProps(c);
    const behaviorsCode = JSON.stringify(
      app.behaviors,
      (key, value) => {
        // if (typeof value === "function") {
        //   console.log(value.toString());
        //   return value.toString();
        // }
        return value;
      },
      2
    );
    // console.log(behaviorsCode);
    return c.render(
      <html>
        <head>
          <title>{seo.title}</title>
        </head>
        <body>
          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: `window.behaviors = ${behaviorsCode}`,
            }}
          />
          <div>{render(serverProps)}</div>
        </body>
      </html>
    );
  });
};
