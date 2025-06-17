import { ChatOpenAI } from "@langchain/openai";

export const create_llm = ({
  modelName = "gpt-4o-mini",
  temperature = 0,
}: {
  modelName?: string;
  temperature?: number;
} = {}) => {
  return new ChatOpenAI({
    modelName,
    temperature,
  });
};
