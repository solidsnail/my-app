import { createComponent } from "../../library/modules/component";
import { UI } from "../../library/ui";

export default createComponent<{ name: string }>({
  name: "Counter",
  render({ name }) {
    return (
      <div>
        <h1>{name}</h1>
        <p>
          Count: <text>Test</text>
        </p>
        <UI.Button>Increment</UI.Button>
        <UI.Button>Decrement</UI.Button>
      </div>
    );
  },
});
