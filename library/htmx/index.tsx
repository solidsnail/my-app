// import __html from "./index.js" with { type: "text" };

const __html = `(function () {
  "use strict";

  const HTMX = {
    version: "1.2.0",
    config: {
      historyEnabled: true,
      timeout: 0,
      scrollBehavior: "smooth",
      defaultSwapStyle: "innerHTML",
      defaultSwapDelay: 0,
      defaultSettleDelay: 20,
      includeIndicatorStyles: true,
      indicatorClass: "htmx-indicator",
      requestClass: "htmx-request",
      swappingClass: "htmx-swapping",
      settlingClass: "htmx-settling",
    },

    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.processElement(document.body);
        this.setupHistoryHandling();
        this.injectDefaultStyles();
      });
    },

    injectDefaultStyles() {
      if (!this.config.includeIndicatorStyles) return;

      const style = document.createElement("style");
      style.textContent =  \`
        .\${this.config.indicatorClass} {
          display: none;
        }
        .\${this.config.requestClass} .\${this.config.indicatorClass} {
          display: inline-block;
        }
        .\${this.config.swappingClass} {
          opacity: 0;
          transition: opacity 0.2s ease-out;
        }
        .\${this.config.settlingClass} {
          opacity: 1;
          transition: opacity 0.2s ease-in;
        }
       \`;
      document.head.appendChild(style);
    },

    setupHistoryHandling() {
      if (!this.config.historyEnabled) return;

      window.addEventListener("popstate", (e) => {
        if (e.state && e.state.htmx) {
          // Restore page state from history
          this.restoreHistory(e.state);
        }
      });
    },

    restoreHistory(state) {
      // Restore content from history state
      if (state.content && state.target) {
        const target = document.querySelector(state.target);
        if (target) {
          target.innerHTML = state.content;
          this.processElement(target);
        }
      }
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
      // Skip if already set up
      if (el.dataset.htmxSetup) return;
      el.dataset.htmxSetup = "true";

      // Handle hx-boost
      if (el.hasAttribute("hx-boost")) {
        if (el.tagName === "A") {
          el.addEventListener("click", (e) => {
            e.preventDefault();
            this.makeRequest(
              el,
              "get",
              el.href,
              el.getAttribute("hx-target") || "body",
              el.getAttribute("hx-swap") || "innerHTML",
              el.getAttribute("hx-indicator"),
              el.getAttribute("hx-vals"),
              el.getAttribute("hx-include"),
              el.getAttribute("hx-push-url") || "true",
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
              el.method.toLowerCase() || "post",
              el.action,
              el.getAttribute("hx-target"),
              el.getAttribute("hx-swap") || "innerHTML",
              el.getAttribute("hx-indicator"),
              el.getAttribute("hx-vals"),
              el.getAttribute("hx-include"),
              el.getAttribute("hx-push-url"),
              el.getAttribute("hx-select"),
              el.getAttribute("hx-headers"),
              el.getAttribute("hx-params"),
              el.getAttribute("hx-encoding")
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

        let handler;
        let timeout;
        let lastValue;

        switch (eventName) {
          case "load":
            window.addEventListener("load", (e) => {
              // Handle delay/throttle
              if (eventOptions.delay || eventOptions.throttle) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                  this.executeRequest(el, method, url);
                }, eventOptions.delay || eventOptions.throttle);
              } else {
                this.executeRequest(el, method, url);
              }
              if (eventOptions.once) el.dataset.htmxTriggered = "true";
            });
            break;

          case "revealed":
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !el.dataset.htmxTriggered) {
                  // Handle delay/throttle
                  if (eventOptions.delay || eventOptions.throttle) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                      this.executeRequest(el, method, url);
                    }, eventOptions.delay || eventOptions.throttle);
                  } else {
                    this.executeRequest(el, method, url);
                  }
                  if (eventOptions.once) el.dataset.htmxTriggered = "true";
                }
              });
            });
            observer.observe(el);
            break;

          case "intersect":
            const intersectObserver = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    this.executeRequest(el, method, url);
                    if (eventOptions.once) el.dataset.htmxTriggered = "true";
                  }
                });
              },
              { threshold: eventOptions.threshold || 0 }
            );
            intersectObserver.observe(el);
            break;

          default:
            handler = (e) => {
              if (
                eventName === "submit" ||
                (eventName === "click" && el.tagName === "FORM")
              ) {
                e.preventDefault();
              }

              // Handle hx-prompt
              const promptMsg = el.getAttribute("hx-prompt");
              if (promptMsg) {
                const promptValue = window.prompt(promptMsg);
                if (promptValue === null) return; // User cancelled
                el.dataset.htmxPromptValue = promptValue;
              }

              // Handle hx-confirm
              const confirmMsg = el.getAttribute("hx-confirm");
              if (confirmMsg && !window.confirm(confirmMsg)) return;

              if (eventOptions.once && el.dataset.htmxTriggered) return;

              // Handle changed modifier
              if (eventOptions.changed) {
                const currentValue = el.value || el.innerText;
                if (currentValue === lastValue) return;
                lastValue = currentValue;
              }

              // Handle delay/throttle
              if (eventOptions.delay || eventOptions.throttle) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                  this.executeRequest(el, method, url);
                }, eventOptions.delay || eventOptions.throttle);
              } else {
                this.executeRequest(el, method, url);
              }

              if (eventOptions.once) el.dataset.htmxTriggered = "true";
            };

            el.addEventListener(eventName, handler);
            break;
        }
      });
    },

    parseModifiers(modifiers) {
      const options = {};
      modifiers.forEach((mod) => {
        if (mod === "once") options.once = true;
        if (mod === "changed") options.changed = true;
        if (mod.startsWith("delay:")) {
          const value = mod.split(":")[1];
          options.delay = this.parseTime(value);
        }
        if (mod.startsWith("throttle:")) {
          const value = mod.split(":")[1];
          options.throttle = this.parseTime(value);
        }
        if (mod.startsWith("threshold:"))
          options.threshold = parseFloat(mod.split(":")[1]);
      });
      return options;
    },

    parseTime(value) {
      // Handle both "300ms" and "1s" formats
      if (value.endsWith("ms")) {
        return parseInt(value);
      } else if (value.endsWith("s")) {
        return parseInt(value) * 1000;
      }
      return parseInt(value); // Fallback to treating as ms
    },

    getMethod(el) {
      if (el.hasAttribute("hx-get")) return "get";
      if (el.hasAttribute("hx-post")) return "post";
      if (el.hasAttribute("hx-put")) return "put";
      if (el.hasAttribute("hx-delete")) return "delete";
      if (el.hasAttribute("hx-patch")) return "patch";
      return "get";
    },

    executeRequest(el, method, url) {
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
        el.getAttribute("hx-params"),
        el.getAttribute("hx-encoding")
      );
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
      paramsAttr,
      encoding
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

      // Add request class
      el.classList.add(this.config.requestClass);

      // Show indicator
      if (indicatorEl) {
        indicatorEl.style.display = "block";
      } else {
        // Look for indicator children
        const childIndicators = el.querySelectorAll(
           \`.\${this.config.indicatorClass} \`
        );
        childIndicators.forEach((ind) => (ind.style.display = "block"));
      }

      // Disable element if hx-disable is set
      const disableText = el.getAttribute("hx-disable-with");
      let originalText;
      if (el.hasAttribute("hx-disable")) {
        el.disabled = true;
        if (disableText) {
          originalText = el.innerHTML;
          el.innerHTML = disableText;
        }
      }

      // Handle hx-sync (prevent concurrent requests)
      const syncAttr = el.getAttribute("hx-sync");
      if (syncAttr) {
        const [syncTarget, syncStrategy] = syncAttr.split(":");
        const syncEl =
          syncTarget === "this" ? el : document.querySelector(syncTarget);
        if (syncEl && syncEl.dataset.htmxRequesting) {
          if (syncStrategy === "drop") return; // Drop this request
          if (syncStrategy === "abort") {
            // Abort ongoing request (simplified - real implementation would need AbortController)
          }
        }
        if (syncEl) syncEl.dataset.htmxRequesting = "true";
      }

      try {
        // Lifecycle event before request
        const beforeEvent = new CustomEvent("htmx:beforeRequest", {
          detail: { el, url, method },
          cancelable: true,
        });
        const shouldContinue = targetEl.dispatchEvent(beforeEvent);
        if (!shouldContinue) return;

        const body = this.getRequestBody(
          el,
          vals,
          include,
          paramsAttr,
          encoding
        );
        const headers = {
          "HX-Request": "true",
          "HX-Current-URL": window.location.href,
          "HX-Trigger": el.id || el.name || "",
          "HX-Trigger-Name": el.name || "",
          "HX-Target": targetEl.id || "",
        };

        // Add prompt value if exists
        if (el.dataset.htmxPromptValue) {
          headers["HX-Prompt"] = el.dataset.htmxPromptValue;
          delete el.dataset.htmxPromptValue;
        }

        if (headersAttr) {
          try {
            Object.assign(headers, JSON.parse(headersAttr));
          } catch (e) {
            console.error("HTMX: Invalid hx-headers JSON:", headersAttr);
          }
        }

        const options = { method: method.toUpperCase(), headers };

        if (method !== "get" && body) {
          if (encoding === "multipart/form-data") {
            options.body = body; // FormData
            // Don't set Content-Type, browser will set it with boundary
          } else {
            headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(body);
          }
        }

        // Add timeout if configured
        let timeoutId;
        if (this.config.timeout > 0) {
          timeoutId = setTimeout(() => {
            throw new Error("Request timeout");
          }, this.config.timeout);
        }

        const response = await fetch(url, options);

        if (timeoutId) clearTimeout(timeoutId);

        // Check for HX-Redirect header
        const hxRedirect = response.headers.get("HX-Redirect");
        if (hxRedirect) {
          window.location.href = hxRedirect;
          return;
        }

        // Check for HX-Refresh header
        if (response.headers.get("HX-Refresh") === "true") {
          window.location.reload();
          return;
        }

        const html = await response.text();

        // Lifecycle event after request
        targetEl.dispatchEvent(
          new CustomEvent("htmx:afterRequest", { detail: { el, response } })
        );

        // Lifecycle event before swap
        const beforeSwapEvent = new CustomEvent("htmx:beforeSwap", {
          detail: { el, html, swap },
          cancelable: true,
        });
        const shouldSwap = targetEl.dispatchEvent(beforeSwapEvent);
        if (!shouldSwap) return;

        // Store current content for history
        const currentContent = targetEl.innerHTML;
        const currentScrollY = window.scrollY;

        // Add swapping class
        targetEl.classList.add(this.config.swappingClass);

        // Perform swap after delay
        setTimeout(() => {
          this.performSwap(targetEl, html, swap, select);

          // Handle URL updates
          if (pushUrl && pushUrl !== "false") {
            const newUrl = pushUrl === "true" ? url : pushUrl;
            const state = {
              htmx: true,
              content: currentContent,
              target: targetSelector || "body",
              scrollY: currentScrollY,
            };
            window.history.pushState(state, "", newUrl);
          }

          const replaceUrl = el.getAttribute("hx-replace-url");
          if (replaceUrl && replaceUrl !== "false") {
            const newUrl = replaceUrl === "true" ? url : replaceUrl;
            window.history.replaceState({}, "", newUrl);
          }

          // Remove swapping class and add settling class
          targetEl.classList.remove(this.config.swappingClass);
          targetEl.classList.add(this.config.settlingClass);

          // Process new content
          this.processElement(targetEl);

          // Handle scroll behavior
          const scrollTarget = el.getAttribute("hx-scroll");
          if (scrollTarget) {
            const scrollEl =
              scrollTarget === "true"
                ? targetEl
                : document.querySelector(scrollTarget);
            if (scrollEl) {
              scrollEl.scrollIntoView({ behavior: this.config.scrollBehavior });
            }
          }

          // Lifecycle event after swap
          targetEl.dispatchEvent(
            new CustomEvent("htmx:afterSwap", {
              detail: { target: targetEl, swap },
            })
          );

          // Remove settling class after delay
          setTimeout(() => {
            targetEl.classList.remove(this.config.settlingClass);

            // Lifecycle event after settle
            targetEl.dispatchEvent(
              new CustomEvent("htmx:afterSettle", {
                detail: { target: targetEl },
              })
            );
          }, this.config.defaultSettleDelay);
        }, this.config.defaultSwapDelay);
      } catch (error) {
        console.error("HTMX: Request failed:", error);
        targetEl.dispatchEvent(
          new CustomEvent("htmx:responseError", { detail: { error } })
        );
      } finally {
        // Remove request class
        el.classList.remove(this.config.requestClass);

        // Hide indicator
        if (indicatorEl) {
          indicatorEl.style.display = "none";
        } else {
          const childIndicators = el.querySelectorAll(
             \`.\${this.config.indicatorClass} \`
          );
          childIndicators.forEach((ind) => (ind.style.display = "none"));
        }

        // Re-enable element
        if (el.hasAttribute("hx-disable")) {
          el.disabled = false;
          if (disableText && originalText) {
            el.innerHTML = originalText;
          }
        }

        // Clear sync flag
        const syncAttr = el.getAttribute("hx-sync");
        if (syncAttr) {
          const [syncTarget] = syncAttr.split(":");
          const syncEl =
            syncTarget === "this" ? el : document.querySelector(syncTarget);
          if (syncEl) delete syncEl.dataset.htmxRequesting;
        }
      }
    },

    getRequestBody(el, vals, include, paramsAttr, encoding) {
      const useFormData = encoding === "multipart/form-data";
      const body = useFormData ? new FormData() : {};

      const form = el.tagName === "FORM" ? el : el.closest("form");
      if (form) {
        const formData = new FormData(form);
        const params = paramsAttr
          ? paramsAttr.split(",").map((p) => p.trim())
          : null;

        // Handle hx-validate
        if (
          el.hasAttribute("hx-validate") &&
          el.getAttribute("hx-validate") !== "false"
        ) {
          if (!form.checkValidity()) {
            form.reportValidity();
            throw new Error("Form validation failed");
          }
        }

        formData.forEach((value, key) => {
          if (!params || params.includes(key) || params.includes("*")) {
            if (useFormData) {
              body.append(key, value);
            } else {
              body[key] = value;
            }
          }
        });
      }

      if (vals) {
        try {
          const valsObj = JSON.parse(vals);
          if (useFormData) {
            Object.entries(valsObj).forEach(([key, value]) => {
              body.append(key, value);
            });
          } else {
            Object.assign(body, valsObj);
          }
        } catch (e) {
          console.error("HTMX: Invalid hx-vals JSON:", vals);
        }
      }

      if (include) {
        const includeEls = document.querySelectorAll(include);
        includeEls.forEach((includeEl) => {
          if (includeEl.name) {
            if (useFormData) {
              body.append(includeEl.name, includeEl.value);
            } else {
              body[includeEl.name] = includeEl.value;
            }
          }
        });
      }

      if (useFormData) {
        return body.keys().next().done ? null : body;
      }
      return Object.keys(body).length > 0 ? body : null;
    },

    performSwap(target, html, swap, select) {
      let content = html;
      if (select) {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        const selectedEl = temp.querySelector(select);
        content = selectedEl ? selectedEl.innerHTML : "";
      }

      // Handle hx-preserve
      const preserveEls = target.querySelectorAll(
        "[hx-preserve], [data-hx-preserve]"
      );
      const preserved = new Map();
      preserveEls.forEach((el) => {
        const id = el.id || \`preserve-\${Math.random()} \`;
        el.id = id;
        preserved.set(id, el.cloneNode(true));
      });

      switch (swap) {
        case "innerHTML":
          target.innerHTML = content;
          break;
        case "outerHTML":
          target.outerHTML = content;
          return; // Target is replaced, can't restore preserved elements
        case "beforebegin":
          target.insertAdjacentHTML("beforebegin", content);
          break;
        case "afterbegin":
          target.insertAdjacentHTML("afterbegin", content);
          break;
        case "beforeend":
          target.insertAdjacentHTML("beforeend", content);
          break;
        case "afterend":
          target.insertAdjacentHTML("afterend", content);
          break;
        case "delete":
          setTimeout(() => target.remove(), 0);
          return;
        case "none":
          break;
        default:
          target.innerHTML = content;
      }

      // Restore preserved elements
      preserved.forEach((el, id) => {
        const newEl = document.getElementById(id);
        if (newEl) {
          newEl.replaceWith(el);
        }
      });
    },
  };

  HTMX.init();
  window.htmx = HTMX;
})();
`;
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
        __html,
      }}
    />
  );
};
