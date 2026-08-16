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
