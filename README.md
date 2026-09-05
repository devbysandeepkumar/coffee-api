# Coffee API

A TypeScript backend that turns unstructured web data into structured coffee information using an AI agent pipeline. Built with **LangGraph** for orchestrating multi-step reasoning, **LangChain** for the agent/tooling layer, and **Tavily** as the search backend to pull real-time, sourced data on origins, roasts, brewing methods, and more.

## How it works
1. Query comes in (e.g., "Ethiopian Yirgacheffe tasting notes")
2. LangGraph routes the request through a search → extract → structure pipeline
3. Tavily fetches relevant, up-to-date web results
4. LangChain/Mistral parses and structures the response into clean JSON
5. API returns structured data to the frontend

## Stack
- **Language**: TypeScript
- **Orchestration**: LangGraph
- **Agent framework**: LangChain
- **Search**: Tavily API
- **LLM**: Mistral AI

## Run locally

Create a `.env` file with `MISTRAL_API_KEY` and `TAVILY_API_KEY`, then run:

```bash
npm install
npm start
```

The endpoint is available at `http://localhost:3000/api/search?name=latte`.
The root URL returns a health response.

## Deploy to Vercel

Import this repository into Vercel and add `MISTRAL_API_KEY` and `TAVILY_API_KEY` as project environment variables. Vercel detects `api/index.ts` as the serverless entrypoint, so the deployed endpoint is `/api/search?name=latte`.
