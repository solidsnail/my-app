import { createPage } from "../../library/modules/page.tsx";
import { UI } from "../../library/ui/index.tsx";
import Counter from "../components/counter.tsx";
import { app } from "../index.tsx";

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
        <Counter name="Cool Counter" />
        <UI.Accordion summary="The accordion">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quibusdam quidem. Voluptate voluptas
        </UI.Accordion>
        <ul>
          {props.messages.map((message) => {
            return <li key={message}>{message}!!</li>;
          })}
        </ul>
      </>
    );
  },
});
