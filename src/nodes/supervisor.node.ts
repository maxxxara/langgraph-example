import { BaseMessage } from "@langchain/core/messages";
import { GraphState } from "../state";

export const supervisorAgent = async (
  messages: BaseMessage[]
): Promise<{ nextNode: string; analysis?: string }> => {
  return {
    nextNode: "copywriter_agent_node",
    analysis: "Detected math-related query",
  };
};

export const supervisor_node = async (
  state: typeof GraphState.State
): Promise<Partial<typeof GraphState.State>> => {
  const result = await supervisorAgent(state.messages);
  return {
    next_node: result.nextNode,
    analysis: result.analysis || state.analysis,
  };
};
