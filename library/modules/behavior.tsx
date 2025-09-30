// library/modules/behavior.tsx

type BehaviorState = Record<string, any>;
type BehaviorActions = Record<string, (...args: any[]) => Promise<void>>;

type BehaviorMethods = {
  when: Record<string, (...args: any[]) => Promise<void>>;
  then: Record<string, () => any>;
  given: Record<string, () => Promise<void>>;
};

type BehaviorStore<S extends BehaviorState, A extends BehaviorActions> = {
  state: S;
  actions: A;
};

type BehaviorDefinition<S extends BehaviorState, A extends BehaviorActions> = {
  state: S;
  actions: A;
};

type BehaviorContext<S extends BehaviorState, A extends BehaviorActions> = {
  store: BehaviorStore<S, A>;
};

type BehaviorMethodsDefinition<
  S extends BehaviorState,
  A extends BehaviorActions
> = {
  when?: Record<
    string,
    (this: BehaviorContext<S, A>, ...args: any[]) => Promise<void>
  >;
  then?: Record<string, (this: BehaviorContext<S, A>) => any>;
  given?: Record<string, (this: BehaviorContext<S, A>) => Promise<void>>;
};

export function createBehavior<
  S extends BehaviorState,
  A extends BehaviorActions
>(
  definition: BehaviorDefinition<S, A>,
  methods: BehaviorMethodsDefinition<S, A>
) {
  const store: BehaviorStore<S, A> = {
    state: { ...definition.state },
    actions: {} as A,
  };

  // Bind actions to store
  for (const [key, action] of Object.entries(definition.actions)) {
    store.actions[key as keyof A] = action.bind({ state: store.state }) as any;
  }

  const context: BehaviorContext<S, A> = { store };

  // Bind methods to context
  const boundMethods: BehaviorMethods = {
    when: {},
    then: {},
    given: {},
  };

  if (methods.when) {
    for (const [key, method] of Object.entries(methods.when)) {
      boundMethods.when[key] = method.bind(context);
    }
  }

  if (methods.then) {
    for (const [key, method] of Object.entries(methods.then)) {
      boundMethods.then[key] = method.bind(context);
    }
  }

  if (methods.given) {
    for (const [key, method] of Object.entries(methods.given)) {
      boundMethods.given[key] = method.bind(context);
    }
  }

  return {
    store,
    when: boundMethods.when,
    then: boundMethods.then,
    given: boundMethods.given,
    get: (key: string) => {
      if (boundMethods.then[key]) {
        return boundMethods.then[key]();
      }
      throw new Error(`Getter "${key}" not found`);
    },
  };
}
