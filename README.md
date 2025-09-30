# A laravel like typescript framework for bun

## Features

### BDD global syntax /

```tsx
//src/behaviors/index.ts

const counter = createBehavior(
  {
    state: {
      count: 0,
    },
    actions: {
      increment(count: number) {
        this.state.count += count;
        return Promise.resolve();
      },
      decrement(count: number) {
        this.state.count -= count;
        return Promise.resolve();
      },
      reset(to: number) {
        this.state.count = to;
        return Promise.resolve();
      },
    },
  },
  {
    when: {
      "Increment the count by"(count: number) {
        return this.store.actions.increment(count);
      },
      "Decrement the count by"(count: number) {
        return this.store.actions.decrement(count);
      },
      "Reset the count to"(to: number) {
        return this.store.actions.reset(to);
      },
    },
    then: {
      "The count"() {
        return this.store.state.count;
      },
      "The count as string"() {
        return this.store.state.count.toString();
      },
    },
    given: {
      "The count is zero"() {
        this.store.state.count = 0;
        return Promise.resolve();
      },
    },
  }
);

export default {
  counter,
};
```

```tsx
//src/index.tsx
import behaviors from "./behaviors";
export default createApplication({
  behaviors,
});
```

```tsx
//src/components/counter.tsx
import { html } from "hono/html";
import { createComponent } from "../../library/modules/component";
import { UI } from "../../library/ui";

export default createComponent<{ name: string }>({
  name: "Counter",
  render({ name }) {
    return (
      <div>
        <h1>{name}</h1>
        <p>
          Count: <UI.Text text={this.counter.get("The count as string")} />
        </p>
        <UI.Button onClick={this.counter.when["Increment the count by"](1)}>
          Increment
        </UI.Button>
        <UI.Button onClick={this.counter.when["Decrement the count by"](1)}>
          Decrement
        </UI.Button>
      </div>
    );
  },
});
```
