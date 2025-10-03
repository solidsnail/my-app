import { createPage } from "../../library/modules/page";
import { UI } from "../../library/ui";
import app from "../index";

app.post("/api/search", async (c) => {
  const body = await c.req.json();
  const query = body.query || "";

  const results = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ].filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return c.html(
    <ul>
      {results.map((result) => (
        <li>{result}</li>
      ))}
    </ul>
  );
});

app.get("/api/time", (c) => {
  return c.html(<div>Server time: {new Date().toLocaleString()}</div>);
});

app.post("/api/form", async (c) => {
  const body = await c.req.json();
  return c.html(
    <div style="color: green;">
      <p>Form submitted successfully!</p>
      <p>Username: {body.username}</p>
      <p>Email: {body.email}</p>
    </div>
  );
});

export default createPage({
  app,
  seo: {
    title: "HTMX Demo",
  },
  name: "Demo",
  route: "/demo",
  getServerSideProps(c) {
    return {};
  },
  render(props) {
    return (
      <div style="padding: 20px; font-family: sans-serif;">
        <h1>HTMX-like Demo</h1>

        <section style="margin: 20px 0; padding: 20px; border: 1px solid #ccc;">
          <h2>Search Example</h2>
          <input
            type="text"
            name="query"
            placeholder="Search fruits..."
            hx-post="/api/search"
            hx-trigger="keyup changed delay:300ms"
            hx-target="#search-results"
            style="padding: 8px; width: 300px;"
          />
          <div id="search-results" style="margin-top: 10px;">
            <p>Start typing to search...</p>
          </div>
        </section>

        <section style="margin: 20px 0; padding: 20px; border: 1px solid #ccc;">
          <h2>Load Content Example</h2>
          <UI.Button hx-get="/api/time" hx-target="#time-display">
            Get Server Time
          </UI.Button>
          <div
            id="time-display"
            style="margin-top: 10px; font-weight: bold;"
          ></div>
        </section>

        <section style="margin: 20px 0; padding: 20px; border: 1px solid #ccc;">
          <h2>Form Example</h2>
          <form hx-post="/api/form" hx-target="#form-result">
            <input
              type="text"
              name="username"
              placeholder="Username"
              style="padding: 8px; margin: 5px;"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              style="padding: 8px; margin: 5px;"
            />
            <UI.Button type="submit">Submit</UI.Button>
          </form>
          <div id="form-result" style="margin-top: 10px;"></div>
        </section>

        <a href="/">← Back to Home</a>
      </div>
    );
  },
});
