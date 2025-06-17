import { BaseMessage } from "@langchain/core/messages";
import {
  Annotation,
  END,
  messagesStateReducer,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { supervisor_node } from "./nodes/supervisor.node";
import { math_agent_node } from "./nodes/math.node";
import { copywriter_agent_node } from "./nodes/copywriter.node";
import { GraphState } from "./state";

// Routing function to determine next node
const route_supervisor = (state: typeof GraphState.State): string => {
  return state.next_node || END;
};

export function createGraph() {
  const graph = new StateGraph(GraphState)
    .addNode("supervisor", supervisor_node)
    .addNode("math_agent_node", math_agent_node)
    .addNode("copywriter_agent_node", copywriter_agent_node);

  graph.addEdge(START, "supervisor");
  graph.addConditionalEdges("supervisor", route_supervisor, {
    math_agent_node: "math_agent_node",
    copywriter_agent_node: "copywriter_agent_node",
  });
  graph.addEdge("math_agent_node", END);
  graph.addEdge("copywriter_agent_node", END);

  const app = graph.compile();
  return app;
}
