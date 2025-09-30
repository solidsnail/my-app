import { html } from "hono/html";
import { createComponent } from "../../library/modules/component";

export default createComponent<{ name: string }>({
  name: "Counter",
  render({ name }) {
    let count = 0;
    return (
      <div>
        <h1>{name}</h1>
        <p>
          Count: <span class="count">{count}</span>
        </p>
        <button class="incr-btn">Increment</button>
        <button class="decr-btn">Increment</button>
        <script type="module">
          {html`console.log(document.getElementById("incr-btn"))`}
        </script>
        <style>{html`.incr-btn{ color: red;}`}</style>
      </div>
    );
  },
});
