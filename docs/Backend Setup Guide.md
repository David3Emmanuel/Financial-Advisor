# Backend Setup & Deployment Guide

Complete guide for setting up and deploying the FinAgent backend.

## 📋 Prerequisites

- Python 3.11 or higher
- pip (Python package installer)
- Git (for deployment)

## 🔑 Getting API Keys

### 1. Google AI Studio (Gemini API)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (format: `AIza...`)

### 2. Tavily API

1. Visit [Tavily](https://tavily.com/)
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key (format: `tvly-...`)

### 3. Finnhub API

1. Visit [Finnhub](https://finnhub.io/)
2. Sign up for a free account
3. Go to Dashboard → API Keys
4. Copy your API key

## 🏠 Local Development

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
GOOGLE_API_KEY=AIza...your_key_here
TAVILY_API_KEY=tvly-...your_key_here
FINNHUB_API_KEY=your_key_here
PORT=8000
```

### 3. Run the Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

### 4. Test the API

**Health Check:**
```bash
curl http://localhost:8000/health
```

**Analyze Query:**
```bash
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"message": "Should I buy NVDA?"}'
```

**API Documentation:**
Open `http://localhost:8000/docs` in your browser for interactive API documentation.

## 🚂 Railway Deployment

Railway provides free hosting for hobby projects with automatic Python detection.

### Step 1: Prepare Your Repository

Ensure your repository structure looks like:
```
Financial-Advisor/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── railway.json
│   └── .env.example
```

### Step 2: Create Railway Project

1. Go to [Railway](https://railway.app/)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Connect and authorize your GitHub account
5. Select your `Financial-Advisor` repository

### Step 3: Configure Railway

1. **Root Directory**: Set to `backend`
   - Settings → Service Settings → Root Directory → `backend`

2. **Start Command** (should auto-detect):
   ```
   python main.py
   ```

3. **Environment Variables**: Add your API keys
   - Variables → Add Variable
   - Add each variable:
     - `GOOGLE_API_KEY`: Your Gemini API key
     - `TAVILY_API_KEY`: Your Tavily API key
     - `FINNHUB_API_KEY`: Your Finnhub API key
   - Note: `PORT` is automatically set by Railway

### Step 4: Deploy

1. Click "Deploy" or push to your main branch
2. Railway will:
   - Detect Python
   - Install dependencies from `requirements.txt`
   - Run `python main.py`
3. Wait for deployment to complete (~2-3 minutes)

### Step 5: Get Your Backend URL

1. Go to Settings → Domains
2. Click "Generate Domain"
3. Copy the URL (e.g., `https://your-app.up.railway.app`)
4. Save this URL for frontend configuration

### Step 6: Test Deployment

```bash
curl https://your-app.up.railway.app/health
```

## 🔧 Troubleshooting

### Common Issues

**1. Deployment fails with "Module not found"**
- Check `requirements.txt` has all dependencies
- Ensure file is named exactly `requirements.txt`

**2. API returns 500 errors**
- Check Railway logs: View Logs in Railway dashboard
- Verify all environment variables are set correctly

**3. CORS errors**
- Ensure `allow_origins=["*"]` in `main.py` (already configured)
- For production, consider limiting allowed origins

**4. Rate limit errors from Gemini**
- The backend includes exponential backoff retry logic
- Check your API quota in Google AI Studio
- Consider upgrading to paid tier for higher limits

**5. Railway keeps restarting**
- Check logs for Python errors
- Ensure Python version compatibility (3.11+)
- Verify `main.py` starts successfully locally

### Viewing Logs

**Local:**
```bash
python main.py
# Logs appear in console
```

**Railway:**
1. Open your project in Railway
2. Click on the service
3. Select "View Logs"
4. Real-time logs will appear

## 📊 Monitoring

### Health Check

Railway automatically monitors the health endpoint. If it fails, the service will restart.

### Manual Monitoring

```bash
# Check if backend is up
curl https://your-app.up.railway.app/health

# Test analysis endpoint
curl -X POST https://your-app.up.railway.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"message": "Test query"}'
```

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use environment variables** for all secrets
3. **Rotate API keys** periodically
4. **Monitor API usage** to avoid unexpected charges
5. **For production**: Limit CORS origins to your frontend domain

## 🚀 Performance Tips

1. **Cold starts**: Railway may take a few seconds to wake up after inactivity
2. **API caching**: Consider implementing Redis for frequently requested data
3. **Rate limiting**: Add rate limiting middleware to prevent abuse
4. **Async operations**: The backend already uses async for better performance

## 📈 Scaling

Railway provides easy scaling options:

1. **Vertical scaling**: Increase memory/CPU in Railway dashboard
2. **Multiple instances**: Enable horizontal scaling for high traffic
3. **Database**: Add PostgreSQL if you need data persistence

## 🛠️ Development Workflow

1. Make changes locally
2. Test with `python main.py`
3. Commit and push to GitHub
4. Railway automatically redeploys
5. Monitor logs for any issues

## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GOOGLE_API_KEY` | Yes | Gemini API key | `AIza...` |
| `TAVILY_API_KEY` | Yes | Tavily API key | `tvly-...` |
| `FINNHUB_API_KEY` | Yes | Finnhub API key | `abc123...` |
| `PORT` | No | Server port (auto-set by Railway) | `8000` |

## 🔗 Useful Links

- [Railway Documentation](https://docs.railway.app/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Google AI Studio](https://makersuite.google.com/)
- [Tavily API Docs](https://docs.tavily.com/)
- [Finnhub API Docs](https://finnhub.io/docs/api)
