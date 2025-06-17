import { BaseMessage } from "@langchain/core/messages";
import { Annotation, messagesStateReducer } from "@langchain/langgraph";

export const GraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  userName: Annotation<string>({
    value: (prev, next) => next,
    default: () => "Unknown User",
  }),
  analysis: Annotation<string>({
    value: (prev, next) => next,
    default: () => "No analysis available",
  }),
  next_node: Annotation<string>({
    value: (prev, next) => next,
    default: () => "",
  }),
});
