# FinAgent Backend

FastAPI backend for the Financial Advisor AI Agent. Uses Gemini 2.5 Flash for AI-powered financial analysis, integrated with Finnhub for market data and Tavily for news sentiment.

## 🚀 Quick Start

### Prerequisites

- Python 3.11 or higher
- API keys from:
  - [Google AI Studio](https://makersuite.google.com/app/apikey) (Gemini)
  - [Tavily](https://tavily.com/) (News search)
  - [Finnhub](https://finnhub.io/) (Market data)

### Local Development

1. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

3. **Run the server**:

   ```bash
   python main.py
   ```

4. **Test the API**:
   - Health check: http://localhost:8000/health
   - API docs: http://localhost:8000/docs

## 📡 API Endpoints

### `POST /api/analyze`

Analyzes a financial query using the AI agent.

**Request Body**:

```json
{
  "message": "Should I buy NVDA stock?"
}
```

**Response**:

```json
{
  "text": "# NVDA Analysis\n\n**Current Price**: $726.13...",
  "status": "success"
}
```

### `GET /health`

Health check endpoint.

**Response**:

```json
{
  "status": "healthy",
  "timestamp": 1708617600.0
}
```

## 🚂 Deployment to Railway

1. **Create a new project** on [Railway](https://railway.app/)

2. **Connect your GitHub repository**

3. **Add environment variables** in the Railway dashboard:
   - `GOOGLE_API_KEY`
   - `TAVILY_API_KEY`
   - `FINNHUB_API_KEY`
   - Railway automatically sets `PORT`

4. **Deploy**: Railway will auto-detect Python and install dependencies from `requirements.txt`

5. **Start command**: `python main.py` (Railway should detect this automatically)

## 🛠️ Tech Stack

- **FastAPI**: Modern, fast web framework
- **Gemini 2.5 Flash**: AI agent with function calling
- **Finnhub API**: Real-time market data
- **Tavily API**: Financial news and sentiment
- **Uvicorn**: ASGI server

## 🔧 Configuration

The backend uses environment variables for configuration:

- `GOOGLE_API_KEY`: Required for Gemini AI
- `TAVILY_API_KEY`: Required for news search
- `FINNHUB_API_KEY`: Required for market data
- `PORT`: Server port (default: 8000)

## 📝 Features

- ✅ AI-powered financial analysis
- ✅ Real-time market data integration
- ✅ News sentiment analysis
- ✅ Exponential backoff for API rate limits
- ✅ CORS enabled for frontend integration
- ✅ Automatic function calling with Gemini
- ✅ Error handling and validation

## 🐛 Troubleshooting

**API Key errors**: Ensure all three API keys are set in your environment variables.

**CORS errors**: The backend allows all origins by default. Modify `allow_origins` in `main.py` if needed.

**Rate limits**: The backend includes exponential backoff retry logic for Gemini API calls.
