import { createPage } from "../../library/modules/page";
import Counter from "../components/counter";
import app from "../index";

export default createPage({
  app,
  seo: {
    title: "Homepage",
  },
  name: "Homepage",
  route: "/",
  getServerSideProps(c) {
    return {
      messages: ["Good Morning", "Good Evening", "Good Night"],
    };
  },
  render(props) {
    return (
      <>
        <h1>Hello Hono!</h1>
        <Counter name="Cool" />
        <ul>
          {props.messages.map((message) => {
            return <li>{message}!!</li>;
          })}
        </ul>
      </>
    );
  },
});
