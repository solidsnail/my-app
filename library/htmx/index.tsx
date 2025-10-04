export type HtmxAttributes = {
  "hx-get"?: ApiDeclaration[keyof ApiDeclaration]["get"][number];
  "hx-post"?: ApiDeclaration[keyof ApiDeclaration]["post"][number];
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
  "hx-headers"?: string;
  "hx-disable"?: string;
  "hx-disable-with"?: string;
  "hx-params"?: string;
};

export const htmxScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  "use strict";

  const HTMX = {
    version: "1.1.0",

    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.processElement(document.body);
      });
    },

    processElement(element) {
      const elements = element.querySelectorAll(
        "[hx-get], [hx-post], [hx-put], [hx-delete], [hx-patch], [hx-boost]"
      );
      elements.forEach((el) => this.setupElement(el));

      if (
        element.hasAttribute &&
        (element.hasAttribute("hx-get") ||
          element.hasAttribute("hx-post") ||
          element.hasAttribute("hx-put") ||
          element.hasAttribute("hx-delete") ||
          element.hasAttribute("hx-patch") ||
          element.hasAttribute("hx-boost"))
      ) {
        this.setupElement(element);
      }
    },

    setupElement(el) {
      // Handle hx-boost
      if (el.hasAttribute("hx-boost")) {
        if (el.tagName === "A") {
          el.addEventListener("click", (e) => {
            e.preventDefault();
            this.makeRequest(
              el,
              "get",
              el.href,
              el.getAttribute("hx-target"),
              el.getAttribute("hx-swap") || "innerHTML",
              el.getAttribute("hx-indicator"),
              el.getAttribute("hx-vals"),
              el.getAttribute("hx-include"),
              el.getAttribute("hx-push-url"),
              el.getAttribute("hx-select"),
              el.getAttribute("hx-headers"),
              el.getAttribute("hx-params")
            );
          });
          return;
        } else if (el.tagName === "FORM") {
          el.addEventListener("submit", (e) => {
            e.preventDefault();
            this.makeRequest(
              el,
              el.method || "post",
              el.action,
              el.getAttribute("hx-target"),
              el.getAttribute("hx-swap") || "innerHTML",
              el.getAttribute("hx-indicator"),
              el.getAttribute("hx-vals"),
              el.getAttribute("hx-include"),
              el.getAttribute("hx-push-url"),
              el.getAttribute("hx-select"),
              el.getAttribute("hx-headers"),
              el.getAttribute("hx-params")
            );
          });
          return;
        }
      }

      const method = this.getMethod(el);
      const url = el.getAttribute("hx-" + method);
      const trigger =
        el.getAttribute("hx-trigger") ||
        (el.tagName === "FORM" ? "submit" : "click");

      if (!url) return;

      const triggers = trigger.split(",").map((t) => t.trim());
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
                el.getAttribute("hx-target"),
                el.getAttribute("hx-swap") || "innerHTML",
                el.getAttribute("hx-indicator"),
                el.getAttribute("hx-vals"),
                el.getAttribute("hx-include"),
                el.getAttribute("hx-push-url"),
                el.getAttribute("hx-select"),
                el.getAttribute("hx-headers"),
                el.getAttribute("hx-params")
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

              const confirmMsg = el.getAttribute("hx-confirm");
              if (confirmMsg && !window.confirm(confirmMsg)) return;

              if (eventOptions.once && el.dataset.htmxTriggered) return;

              this.makeRequest(
                el,
                method,
                url,
                el.getAttribute("hx-target"),
                el.getAttribute("hx-swap") || "innerHTML",
                el.getAttribute("hx-indicator"),
                el.getAttribute("hx-vals"),
                el.getAttribute("hx-include"),
                el.getAttribute("hx-push-url"),
                el.getAttribute("hx-select"),
                el.getAttribute("hx-headers"),
                el.getAttribute("hx-params")
              );

              if (eventOptions.once) el.dataset.htmxTriggered = "true";
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
      pushUrl,
      select,
      headersAttr,
      paramsAttr
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

      // Show indicator
      if (indicatorEl) indicatorEl.style.display = "block";

      // Disable element if hx-disable is set
      const disableText = el.getAttribute("hx-disable-with");
      if (el.hasAttribute("hx-disable")) {
        el.disabled = true;
        if (disableText) el.dataset.htmxOriginal = el.innerHTML;
        if (disableText) el.innerHTML = disableText;
      }

      try {
        // Lifecycle event before request
        targetEl.dispatchEvent(
          new CustomEvent("htmx:beforeRequest", { detail: { el, url, method } })
        );

        const body = this.getRequestBody(el, vals, include, paramsAttr);
        const headers = {
          "HX-Request": "true",
          "HX-Current-URL": window.location.href,
        };

        if (headersAttr) {
          try {
            Object.assign(headers, JSON.parse(headersAttr));
          } catch (e) {
            console.error("HTMX: Invalid hx-headers JSON:", headersAttr);
          }
        }

        if (method !== "get" && body) headers["Content-Type"] = "application/json";

        const options = { method: method.toUpperCase(), headers };
        if (method !== "get" && body) options.body = JSON.stringify(body);

        const response = await fetch(url, options);
        const html = await response.text();

        // Lifecycle event after request
        targetEl.dispatchEvent(
          new CustomEvent("htmx:afterRequest", { detail: { el, response } })
        );

        // Lifecycle event before swap
        targetEl.dispatchEvent(
          new CustomEvent("htmx:beforeSwap", { detail: { el, html, swap } })
        );

        this.performSwap(targetEl, html, swap, select);

        if (pushUrl && pushUrl !== "false") {
          const newUrl = pushUrl === "true" ? url : pushUrl;
          window.history.pushState({}, "", newUrl);
        }

        this.processElement(targetEl);

        // Lifecycle event after swap
        targetEl.dispatchEvent(
          new CustomEvent("htmx:afterSwap", { detail: { target: targetEl, swap } })
        );
      } catch (error) {
        console.error("HTMX: Request failed:", error);
        targetEl.dispatchEvent(
          new CustomEvent("htmx:responseError", { detail: { error } })
        );
      } finally {
        if (indicatorEl) indicatorEl.style.display = "none";
        if (el.hasAttribute("hx-disable")) {
          el.disabled = false;
          if (disableText && el.dataset.htmxOriginal) {
            el.innerHTML = el.dataset.htmxOriginal;
          }
        }
      }
    },

    getRequestBody(el, vals, include, paramsAttr) {
      const body = {};

      const form = el.tagName === "FORM" ? el : el.closest("form");
      if (form) {
        const formData = new FormData(form);
        const params = paramsAttr ? paramsAttr.split(",").map((p) => p.trim()) : null;
        formData.forEach((value, key) => {
          if (!params || (params && params.includes(key))) {
            body[key] = value;
          }
        });
      }

      if (vals) {
        try {
          Object.assign(body, JSON.parse(vals));
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

    performSwap(target, html, swap, select) {
      let content = html;
      if (select) {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        content = temp.querySelector(select)?.innerHTML || "";
      }

      switch (swap) {
        case "innerHTML": target.innerHTML = content; break;
        case "outerHTML": target.outerHTML = content; break;
        case "beforebegin": target.insertAdjacentHTML("beforebegin", content); break;
        case "afterbegin": target.insertAdjacentHTML("afterbegin", content); break;
        case "beforeend": target.insertAdjacentHTML("beforeend", content); break;
        case "afterend": target.insertAdjacentHTML("afterend", content); break;
        case "delete": target.remove(); break;
        case "none": break;
        default: target.innerHTML = content;
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
