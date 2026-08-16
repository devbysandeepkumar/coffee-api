import { tavily } from "@tavily/core";
import { config } from "../config/config.env";

const tvly = tavily({ apiKey: config.TAVILY_API_KEY });

export const tavilySearch = async ({ query }: { query: string }) => {
  try {
    const response = await tvly.search(query, {
      maxResults: 5,
      includeImages: true,
    });
    return JSON.stringify(response);
  } catch (error) {
    console.error("Error searching for coffee:", error);
    throw error;
  }
};
