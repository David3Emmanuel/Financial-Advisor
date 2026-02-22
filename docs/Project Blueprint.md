# Financial Research Agent: Architecture & API Summary

## 1. Core Concept

A lightweight AI-driven agent that synthesizes real-time market data (via Finnhub) and web-based sentiment (via Tavily) to provide a "Risk Score" and actionable research reports for financial assets.

## 2. Technical Stack

- **Frontend**: React (SPA) with Tailwind CSS for rapid UI development and Vite for modern build tooling.
- **Backend**: Python (FastAPI) deployed on Railway.
- **Agent Orchestration**: Gemini 2.5 Flash (via Google AI Studio) using Function Calling logic.
- **Data Sourcing**:
  - Tavily API: Real-time financial news and web search.
  - Finnhub API: Live prices, technical indicators, and crypto/forex/stock data.

## 3. Data Flow

1. **Request**: User inputs a ticker (e.g., $TSLA, $BTC) or a natural language question.
2. **Reasoning**: Gemini identifies that it needs current data and triggers "tools."
3. **Tool Execution**:
   - `get_market_data(ticker)` → Finnhub
   - `search_news(ticker)` → Tavily
4. **Synthesis**: Gemini combines raw numbers with news sentiment.
5. **Response**: The agent returns a structured Markdown report to the UI.

## 4. API Integration Details

- **Gemini 2.5 Flash**: Best-in-class for speed. Use the "system instructions" to enforce a financial analyst persona.
- **Tavily**: Set `search_depth="advanced"` for deep financial context while staying within the free tier.
- **Finnhub**: Use the `/quote` endpoint for prices and technical data.

## 5. Architecture Diagram

```
┌─────────────┐         ┌──────────────┐         ┌─────────────────┐
│   Frontend  │  HTTP   │   Backend    │  API    │  External APIs  │
│  (React +   │────────>│  (FastAPI)   │────────>│  - Gemini       │
│   Vite)     │<────────│              │<────────│  - Finnhub      │
│             │  JSON   │              │  JSON   │  - Tavily       │
└─────────────┘         └──────────────┘         └─────────────────┘
      │                        │
      │                        │
      ▼                        ▼
   Vercel                   Railway
 (Production)             (Production)
```

## 6. Function Calling Flow

```python
User Query: "Should I buy NVDA?"
     │
     ▼
Gemini Agent analyzes query
     │
     ├─> Calls get_market_data("NVDA")
     │   └─> Finnhub API returns: {price: 726.13, change: +2.4%}
     │
     ├─> Calls search_news("NVDA stock news")
     │   └─> Tavily API returns: [article1, article2, article3]
     │
     ▼
Gemini synthesizes data
     │
     ▼
Returns: Markdown report with analysis, sentiment, and risk score
```

## 7. Key Features

- ✅ Real-time market data integration
- ✅ AI-powered sentiment analysis
- ✅ Natural language query processing
- ✅ Automatic function calling
- ✅ Exponential backoff for API resilience
- ✅ CORS-enabled for frontend integration
- ✅ Production-ready deployment configuration

## 8. Future Enhancements

- Add streaming responses for better UX
- Parse Markdown to extract structured data (sentiment, risk score)
- Add historical price charting
- Implement caching for frequently requested data
- Add user authentication
- Support for portfolio tracking
