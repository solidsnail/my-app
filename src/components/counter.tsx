import { createComponent } from "../../library/modules/component.tsx";
import { UI } from "../../library/ui/index.tsx";

export default createComponent<{ name: string; initialCount?: number }>({
  name: "Counter",
  render({ name, initialCount = 0 }) {
    console.log(test);
    return (
      <UI.Box
        p={6}
        bg="#f8f9fa"
        bdr="8px"
        maw={400}
        mx="auto"
        mt={8}
        hx-get="/api/counter/count"
        hx-swap="innerHTML"
        hx-target="#count-value"
        hx-trigger="load"
      >
        <UI.Text fz="xl" fw="bold" mb={4}>
          {name}
        </UI.Text>
        <UI.Box
          id="counter-display"
          p={4}
          bg="white"
          bdr="4px"
          ta="center"
          mb={4}
        >
          <UI.Text fz="lg">
            Count: <span id="count-value">{initialCount}</span>
          </UI.Text>
        </UI.Box>
        <UI.Group spacing={2} justify="center">
          <UI.Button
            size="md"
            variant="filled"
            hx-post="/api/counter/increment"
            hx-target="#count-value"
            hx-swap="innerHTML"
            hover={{ bg: "#1c7ed6" }}
            active={{ bg: "#1971c2" }}
          >
            Increment
          </UI.Button>
          <UI.Button
            size="md"
            variant="outline"
            hx-post="/api/counter/decrement"
            hx-target="#count-value"
            hx-swap="innerHTML"
            hover={{ bg: "#e7f5ff" }}
          >
            Decrement
          </UI.Button>
          <UI.Button
            size="md"
            variant="subtle"
            hx-post="/api/counter/reset"
            hx-target="#count-value"
            hx-swap="innerHTML"
            hover={{ bg: "#d0ebff" }}
          >
            Reset
          </UI.Button>
        </UI.Group>
      </UI.Box>
    );
  },
});
