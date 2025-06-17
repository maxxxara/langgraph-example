import { HumanMessage } from "@langchain/core/messages";
import { createGraph } from "./src/graph";

async function main() {
  const app = createGraph();

  const result = await app.invoke({
    messages: [new HumanMessage("Hi. what is 4 + 4?")],
  });

  console.log(result);
}

main();
