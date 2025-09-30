// src/behaviors/counter.ts

import { createBehavior } from "../../library/modules/behavior";

export const counter = createBehavior(
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
