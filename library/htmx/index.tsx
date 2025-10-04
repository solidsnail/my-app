import __html from "./index.js" with { type: "text" };

type HtmxTriggerEvent =
  | "click"
  | "submit"
  | "change"
  | "keyup"
  | "keydown"
  | "mouseenter"
  | "mouseleave"
  | "focus"
  | "blur"
  | "load"
  | "revealed"
  | "intersect";

export type HtmxAttributes = {
  "hx-get"?: ApiDeclaration[keyof ApiDeclaration]["get"][number];
  "hx-post"?: ApiDeclaration[keyof ApiDeclaration]["post"][number];
  "hx-put"?: ApiDeclaration[keyof ApiDeclaration]["put"][number];
  "hx-delete"?: ApiDeclaration[keyof ApiDeclaration]["delete"][number];
  "hx-patch"?: ApiDeclaration[keyof ApiDeclaration]["patch"][number];
  "hx-target"?: string;
  "hx-swap"?:
    | "innerHTML"
    | "outerHTML"
    | "beforebegin"
    | "afterbegin"
    | "beforeend"
    | "afterend"
    | "delete"
    | "none";
  "hx-trigger"?: HtmxTriggerEvent | (string & {});
  "hx-vals"?: string;
  "hx-include"?: string;
  "hx-select"?: string;
  "hx-indicator"?: string;
  "hx-push-url"?: "true" | "false" | string;
  "hx-confirm"?: string;
  "hx-boost"?: "true" | "false";
  "hx-headers"?: string;
  "hx-disable"?: string;
  "hx-disable-with"?: string;
  "hx-params"?: string;
  "hx-ext"?: string;
  "hx-sync"?: string;
  "hx-validate"?: "true" | "false";
  "hx-encoding"?: "multipart/form-data";
  "hx-preserve"?: "true" | "false";
  "hx-prompt"?: string;
  "hx-replace-url"?: "true" | "false" | string;
  "hx-on"?: string;
};

export const htmxScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: __html as unknown as string,
      }}
    />
  );
};
