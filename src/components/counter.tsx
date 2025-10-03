import { createComponent } from "../../library/modules/component";
import { UI } from "../../library/ui";

export default createComponent<{ name: string; initialCount?: number }>({
  name: "Counter",
  render({ name, initialCount = 0 }) {
    return (
      <div
        hx-get="/api/counter/count"
        hx-swap="innerHTML"
        hx-target="#count-value"
        hx-trigger="load"
      >
        <h1>{name}</h1>
        <div id="counter-display">
          <p>
            Count: <span id="count-value">{initialCount}</span>
          </p>
        </div>
        <UI.Button
          hx-post="/api/counter/increment"
          hx-target="#count-value"
          hx-swap="innerHTML"
        >
          Increment
        </UI.Button>
        <UI.Button
          hx-post="/api/counter/decrement"
          hx-target="#count-value"
          hx-swap="innerHTML"
        >
          Decrement
        </UI.Button>
        <UI.Button
          hx-post="/api/counter/reset"
          hx-target="#count-value"
          hx-swap="innerHTML"
        >
          Reset
        </UI.Button>
      </div>
    );
  },
});
