import { AIMessage, BaseMessage } from "@langchain/core/messages";
import { END } from "@langchain/langgraph";
import { GraphState } from "../state";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { create_llm } from "../utils/llm";

export const mathNode = async (messages: BaseMessage[]): Promise<string> => {
  const llm = create_llm();

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful math agent."],
    ...messages,
  ]);

  const chain = prompt.pipe(llm).pipe(new StringOutputParser());
  return await chain.invoke({});
};

export const math_agent_node = async (
  state: typeof GraphState.State
): Promise<Partial<typeof GraphState.State>> => {
  const result = await mathNode(state.messages);
  return {
    messages: [new AIMessage(result)],
    next_node: END,
  };
};
