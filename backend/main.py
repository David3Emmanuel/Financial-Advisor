import os
import json
import time
import asyncio
import requests
import uvicorn
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

# Load environment variables from .env file
load_dotenv()

# --- Configuration & API Keys ---
# Railway provides these via environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

# Validate required API keys
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is required")
if not TAVILY_API_KEY:
    raise ValueError("TAVILY_API_KEY environment variable is required")
if not FINNHUB_API_KEY:
    raise ValueError("FINNHUB_API_KEY environment variable is required")

# Initialize Gemini
client = genai.Client(api_key=GOOGLE_API_KEY)

app = FastAPI(title="FinAgent Backend")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Tool Definitions (Tools the Agent can use) ---

def get_market_data(ticker: str) -> Dict[str, Any]:
    """Fetches real-time stock/crypto price and technical data from Finnhub."""
    ticker = ticker.upper().replace("$", "")
    url = f"https://finnhub.io/api/v1/quote?symbol={ticker}&token={FINNHUB_API_KEY}"
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        if not data or "c" not in data:
            return {"error": f"No data found for {ticker}"}
        return {
            "current_price": data.get("c"),
            "high": data.get("h"),
            "low": data.get("l"),
            "previous_close": data.get("pc"),
            "change": data.get("d"),
            "percent_change": data.get("dp")
        }
    except Exception as e:
        return {"error": str(e)}

def search_news(query: str) -> Dict[str, Any]:
    """Searches for real-time financial news and sentiment using Tavily."""
    url = "https://api.tavily.com/search"
    payload = {
        "api_key": TAVILY_API_KEY,
        "query": query,
        "search_depth": "advanced",
        "include_answer": True,
        "max_results": 3
    }
    try:
        response = requests.post(url, json=payload, timeout=10)
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# Map tools for the LLM
tools = [get_market_data, search_news]

# --- Exponential Backoff Logic ---

async def call_gemini_with_retry(message: str):
    retries = 5
    for i in range(retries):
        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=message,
                config={
                    'system_instruction': (
                        "You are an expert financial analyst agent. "
                        "Use 'get_market_data' for prices and 'search_news' for news/sentiment. "
                        "Synthesize findings into a concise report. "
                        "Always provide a sentiment (Bullish/Bearish/Neutral) and a Risk Score (1-10). "
                        "Respond in clear Markdown."
                    ),
                    'tools': tools,
                }
            )
            return response
        except Exception as e:
            if i == retries - 1:
                raise e
            wait_time = 2**i
            await asyncio.sleep(wait_time)

# --- API Endpoints ---

class QueryRequest(BaseModel):
    message: str

@app.post("/api/analyze")
async def analyze_financial_query(request: QueryRequest):
    if not GOOGLE_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key missing")

    try:
        # Execute Agent with automatic function calling
        response = await call_gemini_with_retry(request.message)
        if not response:
            raise HTTPException(status_code=500, detail="No response from Gemini")
        
        # Extract text from response
        return {
            "text": response.text,
            "status": "success"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": time.time()}

@app.get("/models")
def list_models():
    """List available Gemini models"""
    try:
        models = client.models.list()
        return {
            "models": [
                {
                    "name": model.name,
                    "display_name": getattr(model, 'display_name', model.name),
                }
                for model in models
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Railway uses the PORT environment variable
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
