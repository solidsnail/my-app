export type HtmxAttributes = {
  "hx-get"?: string;
  "hx-post"?: string;
  "hx-put"?: string;
  "hx-delete"?: string;
  "hx-patch"?: string;
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
  "hx-trigger"?: string;
  "hx-vals"?: string;
  "hx-include"?: string;
  "hx-select"?: string;
  "hx-indicator"?: string;
  "hx-push-url"?: "true" | "false" | string;
  "hx-confirm"?: string;
  "hx-boost"?: "true" | "false";
};

export const htmxScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  "use strict";

  const HTMX = {
    version: "1.0.0",

    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.processElement(document.body);
      });
    },

    processElement(element) {
      const elements = element.querySelectorAll(
        "[hx-get], [hx-post], [hx-put], [hx-delete], [hx-patch]"
      );
      elements.forEach((el) => this.setupElement(el));

      if (
        element.hasAttribute &&
        (element.hasAttribute("hx-get") ||
          element.hasAttribute("hx-post") ||
          element.hasAttribute("hx-put") ||
          element.hasAttribute("hx-delete") ||
          element.hasAttribute("hx-patch"))
      ) {
        this.setupElement(element);
      }
    },

    setupElement(el) {
      const method = this.getMethod(el);
      const url = el.getAttribute("hx-" + method);
      const trigger =
        el.getAttribute("hx-trigger") ||
        (el.tagName === "FORM" ? "submit" : "click");
      const target = el.getAttribute("hx-target");
      const swap = el.getAttribute("hx-swap") || "innerHTML";
      const indicator = el.getAttribute("hx-indicator");
      const confirm = el.getAttribute("hx-confirm");
      const vals = el.getAttribute("hx-vals");
      const include = el.getAttribute("hx-include");
      const pushUrl = el.getAttribute("hx-push-url");

      if (!url) return;

      const triggers = trigger.split(",").map((t) => t.trim());
      console.log({ triggers });
      triggers.forEach((trig) => {
        const [eventName, ...modifiers] = trig.split(" ");
        const eventOptions = this.parseModifiers(modifiers);
        switch (eventName) {
          case "load":
            window.addEventListener("load", (e) => {
              this.makeRequest(
                el,
                method,
                url,
                target,
                swap,
                indicator,
                vals,
                include,
                pushUrl
              );
              el.dataset.htmxTriggered = "true";
            });
            break;
          default:
            el.addEventListener(eventName, (e) => {
              if (
                eventName === "submit" ||
                (eventName === "click" && el.tagName === "FORM")
              ) {
                e.preventDefault();
              }

              if (confirm && !window.confirm(confirm)) {
                return;
              }

              if (eventOptions.once && el.dataset.htmxTriggered) {
                return;
              }

              this.makeRequest(
                el,
                method,
                url,
                target,
                swap,
                indicator,
                vals,
                include,
                pushUrl
              );

              if (eventOptions.once) {
                el.dataset.htmxTriggered = "true";
              }
            });
            break;
        }
      });
    },

    parseModifiers(modifiers) {
      const options = {};
      modifiers.forEach((mod) => {
        if (mod === "once") options.once = true;
        if (mod === "changed") options.changed = true;
        if (mod.startsWith("delay:"))
          options.delay = parseInt(mod.split(":")[1]);
        if (mod.startsWith("throttle:"))
          options.throttle = parseInt(mod.split(":")[1]);
      });
      return options;
    },

    getMethod(el) {
      if (el.hasAttribute("hx-get")) return "get";
      if (el.hasAttribute("hx-post")) return "post";
      if (el.hasAttribute("hx-put")) return "put";
      if (el.hasAttribute("hx-delete")) return "delete";
      if (el.hasAttribute("hx-patch")) return "patch";
      return "get";
    },

    async makeRequest(
      el,
      method,
      url,
      targetSelector,
      swap,
      indicatorSelector,
      vals,
      include,
      pushUrl
    ) {
      const targetEl = targetSelector
        ? document.querySelector(targetSelector)
        : el;
      const indicatorEl = indicatorSelector
        ? document.querySelector(indicatorSelector)
        : null;

      if (!targetEl) {
        console.error("HTMX: Target element not found:", targetSelector);
        return;
      }

      if (indicatorEl) {
        indicatorEl.style.display = "block";
      }

      try {
        const body = this.getRequestBody(el, vals, include);
        const headers = {
          "HX-Request": "true",
          "HX-Current-URL": window.location.href,
        };

        if (method !== "get" && body) {
          headers["Content-Type"] = "application/json";
        }

        const options = {
          method: method.toUpperCase(),
          headers,
        };

        if (method !== "get" && body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const html = await response.text();

        this.performSwap(targetEl, html, swap);

        if (pushUrl && pushUrl !== "false") {
          const newUrl = pushUrl === "true" ? url : pushUrl;
          window.history.pushState({}, "", newUrl);
        }

        this.processElement(targetEl);

        targetEl.dispatchEvent(
          new CustomEvent("htmx:afterSwap", {
            detail: { target: targetEl, swap },
          })
        );
      } catch (error) {
        console.error("HTMX: Request failed:", error);
        targetEl.dispatchEvent(
          new CustomEvent("htmx:error", {
            detail: { error },
          })
        );
      } finally {
        if (indicatorEl) {
          indicatorEl.style.display = "none";
        }
      }
    },

    getRequestBody(el, vals, include) {
      const body = {};

      const form = el.tagName === "FORM" ? el : el.closest("form");
      if (form) {
        const formData = new FormData(form);
        formData.forEach((value, key) => {
          body[key] = value;
        });
      }

      if (vals) {
        try {
          const extraVals = JSON.parse(vals);
          Object.assign(body, extraVals);
        } catch (e) {
          console.error("HTMX: Invalid hx-vals JSON:", vals);
        }
      }

      if (include) {
        const includeEls = document.querySelectorAll(include);
        includeEls.forEach((includeEl) => {
          if (includeEl.name) {
            body[includeEl.name] = includeEl.value;
          }
        });
      }

      return Object.keys(body).length > 0 ? body : null;
    },

    performSwap(target, html, swap) {
      switch (swap) {
        case "innerHTML":
          target.innerHTML = html;
          break;
        case "outerHTML":
          target.outerHTML = html;
          break;
        case "beforebegin":
          target.insertAdjacentHTML("beforebegin", html);
          break;
        case "afterbegin":
          target.insertAdjacentHTML("afterbegin", html);
          break;
        case "beforeend":
          target.insertAdjacentHTML("beforeend", html);
          break;
        case "afterend":
          target.insertAdjacentHTML("afterend", html);
          break;
        case "delete":
          target.remove();
          break;
        case "none":
          break;
        default:
          target.innerHTML = html;
      }
    },
  };

  HTMX.init();
  window.htmx = HTMX;
})();

      `,
      }}
    />
  );
};
