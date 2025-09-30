// src/components/counter.tsx

import { createComponent } from "../../library/modules/component";
import { UI } from "../../library/ui";
import behaviors from "../behaviors";

export default createComponent<{ name: string }>({
  name: "Counter",
  render({ name }) {
    const counter = behaviors.counter;

    return (
      <div>
        <h1>{name}</h1>
        <p>
          Count: <UI.Text text={counter.get("The count as string")} />
        </p>
        <UI.Button onClick={counter.when["Increment the count by"](1)}>
          Increment
        </UI.Button>
        <UI.Button onClick={counter.when["Decrement the count by"](1)}>
          Decrement
        </UI.Button>
      </div>
    );
  },
});
