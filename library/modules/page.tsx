import { Context, Hono } from "hono";
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
    return c.render(
      <html>
        <head>
          <title>{seo.title}</title>
        </head>
        <body>
          <div>{render(serverProps)}</div>
        </body>
      </html>
    );
  });
};
