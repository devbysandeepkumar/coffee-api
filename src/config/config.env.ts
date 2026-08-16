import dotenv from "dotenv";

dotenv.config();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

if (!MISTRAL_API_KEY) {
  throw new Error("MISTRAL_API_KEY is missing from .env");
}

if (!TAVILY_API_KEY) {
  throw new Error("TAVILY_API_KEY is missing from .env");
}

type Config = {
  readonly MISTRAL_API_KEY: string;
  readonly TAVILY_API_KEY: string;
};

export const config: Config = {
  MISTRAL_API_KEY,
  TAVILY_API_KEY,
};
