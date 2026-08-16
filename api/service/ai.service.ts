import { ChatMistralAI } from "@langchain/mistralai";
import { tavilySearch } from "./tavily.service";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { z } from "zod";
import { config } from "../config/config.env";

export const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: config.MISTRAL_API_KEY,
});

const coffeeSchema = z.object({
  name: z.string().describe("The name of the coffee"),
  description: z.string().describe("A brief description of the coffee"),
  ingredients: z
    .array(z.string())
    .describe("List of ingredients used in the coffee"),
  tools: z
    .array(z.string())
    .describe("List of tools required to make the coffee"),
  image: z.string().url().describe("URL of the coffee image"),
  serving: z.string().describe("Serving suggestions for the coffee"),
  preparationTime: z.string().describe("Preparation time for the coffee"),
  difficulty: z.string().describe("Difficulty level of making the coffee"),
});

type Coffee = z.infer<typeof coffeeSchema>;

const CoffeeState = Annotation.Root({
  coffeeName: Annotation<string>(),
  searchResults: Annotation<string>(),
  coffeeDetails: Annotation<Coffee | undefined>(),
});

type GraphState = typeof CoffeeState.State;

const structureModel = model.withStructuredOutput(coffeeSchema, {
  name: "extract_coffee_info",
});

async function searchNode(
  state: GraphState
): Promise<Partial<GraphState>> {
  const query = `
    ${state.coffeeName} coffee drink recipe including
    ingredients, tools, preparation time, difficulty,
    serving suggestions, and image.
  `;

  const searchResults = await tavilySearch({ query });

  return {
    searchResults:
      typeof searchResults === "string"
        ? searchResults
        : JSON.stringify(searchResults),
  };
}

async function extractNode(
  state: GraphState
): Promise<Partial<GraphState>> {
  try {
    const prompt = `
You are a coffee expert.

Coffee name:
${state.coffeeName}

Search results:
${state.searchResults}

Using the search results, provide accurate information about the coffee.

Include:
- Coffee name
- Description
- Ingredients
- Tools required
- Preparation time
- Difficulty level from easy and hard
- Serving only give from 1, 2 and 3cup
- A valid image URL

Do not invent information when it can be determined from the search results.
`;

    const data = await structureModel.invoke(prompt);

    return {
      coffeeDetails: {
        ...data,
        name: state.coffeeName,
      },
    };
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate coffee information");
  }
}

// Graph Definition
const graph = new StateGraph(CoffeeState)
  .addNode("search", searchNode)
  .addNode("extract", extractNode)
  .addEdge(START, "search")
  .addEdge("search", "extract")
  .addEdge("extract", END);

const coffeeAgent = graph.compile();

export async function findCoffee(coffeeName: string): Promise<Coffee | undefined> {
  const result = await coffeeAgent.invoke({
    coffeeName,
    searchResults: "",
    coffeeDetails: undefined,
  });

  if (!result.coffeeDetails) {
    throw new Error("Failed to extract coffee details");
  }

  return result.coffeeDetails;
}
