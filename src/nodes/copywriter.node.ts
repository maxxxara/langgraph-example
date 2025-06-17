import { AIMessage, BaseMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { GraphState } from "../state";
import { END } from "@langchain/langgraph";
import { create_llm } from "../utils/llm";

export const copywriterAgent = async (
  messages: BaseMessage[]
): Promise<string> => {
  const llm = create_llm();
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful copywriter agent."],
    ...messages,
  ]);

  const chain = prompt.pipe(llm).pipe(new StringOutputParser());
  return await chain.invoke({});
};

export const copywriter_agent_node = async (
  state: typeof GraphState.State
): Promise<Partial<typeof GraphState.State>> => {
  const result = await copywriterAgent(state.messages);
  return {
    messages: [new AIMessage(result)],
    next_node: END,
  };
};
