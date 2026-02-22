# 🚀 Complete Deployment Guide

Step-by-step guide for deploying the FinAgent application to production.

## 📋 Overview

- **Backend**: Railway (Python + FastAPI)
- **Frontend**: Railway (React + Vite)
- **Networking**: Private network connection between services
- **Total time**: ~15-20 minutes

## 🎯 Prerequisites

Before you begin, ensure you have:

- [ ] GitHub account
- [ ] Railway account (sign up at [railway.app](https://railway.app/))
- [ ] API keys:
  - [ ] Google AI Studio (Gemini)
  - [ ] Tavily API
  - [ ] Finnhub API

## 📦 Part 1: Deploy Backend to Railway

### Step 1: Push Code to GitHub

If you haven't already:

```bash
cd Financial-Advisor
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/financial-advisor.git
git push -u origin main
```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app/)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize GitHub and select your repository
5. Choose the `Financial-Advisor` repository

### Step 3: Configure Backend Service

1. **Set Root Directory**:
   - Click on your service
   - Go to **Settings** → **Service**
   - Set **Root Directory** to: `backend`
   - Click **Save**

2. **Add Environment Variables**:
   - Go to **Variables** tab
   - Click **"+ New Variable"**
   - Add each variable (click "Add" after each):

   ```
   GOOGLE_API_KEY = your_google_ai_studio_key
   TAVILY_API_KEY = your_tavily_api_key
   FINNHUB_API_KEY = your_finnhub_api_key
   ```

   Note: `PORT` is automatically set by Railway

3. **Verify Start Command** (should auto-detect):
   - Settings → Deploy → Start Command
   - Should show: `python main.py`

### Step 4: Deploy

1. Railway will automatically start deploying
2. Watch the **Deployments** tab for progress
3. Wait for "SUCCESS" status (~2-3 minutes)

### Step 5: Get Backend Service Name

1. In your Railway backend service, note the **service name**
2. By default, it's usually `backend` or `web`
3. You can rename it in **Settings** → **Service** → **Service Name**
4. **Save this name** - you'll need it for frontend private network setup

### Step 6: Test Backend

```bash
# Replace with your actual Railway URL
curl https://your-backend.up.railway.app/health

# Should return:
# {"status":"healthy","timestamp":1708617600.0}
```

## 🎨 Part 2: Deploy Frontend to Railway

### Step 1: Add Frontend Service to Railway Project

1. In your Railway project (same project as backend)
2. Click **"+ New"** → **"GitHub Repo"**
3. Select the same `Financial-Advisor` repository
4. This creates a second service in your project

### Step 2: Configure Frontend Service

1. **Set Root Directory**:
   - Click on the new frontend service
   - Go to **Settings** → **Service**
   - Set **Root Directory** to: `frontend`
   - Click **Save**

2. **Rename Service** (optional but recommended):
   - In **Settings** → **Service**
   - Set **Service Name** to: `frontend`
   - Click **Save**

3. **Add Environment Variables**:
   - Go to **Variables** tab
   - Click **"+ New Variable"**
   - Add variable:
     ```
     VITE_API_URL = http://backend.railway.internal:8000
     ```
   - **Important**: Replace `backend` with your actual backend service name from Part 1, Step 5

### Step 3: Verify Build Configuration

The `railway.json` and `package.json` are already configured to:

- Build the Vite app: `npm run build`
- Serve it with Express: `npm run start`

No additional configuration needed!

### Step 4: Deploy

1. Railway will automatically start deploying
2. Watch the **Deployments** tab for progress
3. Wait for "SUCCESS" status (~2-3 minutes)

### Step 5: Generate Public Domain

1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy the frontend URL (e.g., `https://finagent-frontend.up.railway.app`)
4. This is your public application URL!

### Step 6: Test Frontend

### Step 6: Test Frontend

1. Open your Railway frontend URL in a browser
2. Try a sample query like "$NVDA" or "Should I buy Bitcoin?"
3. Verify it connects to your backend and returns analysis

## 🔗 Understanding Railway Private Networking

### How It Works

Railway's private network allows services within the same project to communicate securely without exposing internal endpoints to the internet.

- **Private URL Format**: `http://<service-name>.railway.internal:<port>`
- **Example**: `http://backend.railway.internal:8000`
- **Advantages**:
  - Faster communication (no external network hops)
  - More secure (internal traffic only)
  - No additional cost for bandwidth
  - Lower latency

### Your Setup

```
┌─────────────────────────────────────────┐
│         Railway Project                 │
│                                         │
│  ┌──────────┐      ┌──────────┐       │
│  │ Frontend │─────▶│ Backend  │       │
│  │ Service  │      │ Service  │       │
│  └──────────┘      └──────────┘       │
│       │                                │
└───────┼────────────────────────────────┘
        │
        ▼
    Internet Users
```

- Users access frontend via public URL
- Frontend communicates with backend via private network
- Backend APIs are not directly exposed to the internet (unless you generate a domain for it)

## ✅ Verification Checklist

After deployment, verify everything works:

### Backend Tests

```bash
# Replace with your actual URLs
BACKEND_URL="https://your-backend.up.railway.app"

# Test 1: Health check
curl $BACKEND_URL/health

# Test 2: Analyze endpoint
curl -X POST $BACKEND_URL/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"message": "NVDA stock analysis"}'
```

Expected: Both should return JSON responses without errors

### Frontend Tests

1. **Open your Railway frontend URL** in a browser
2. **Test search**:
   - Enter "$BTC" in search box
   - Click "Analyze"
   - Should show analysis after a few seconds
3. **Check browser console**:
   - Press F12 → Console tab
   - Should have no errors
4. **Test error handling**:
   - If backend is down, should show error message

### Common Issues

| Issue                               | Solution                                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Frontend shows "API request failed" | Check `VITE_API_URL` environment variable in frontend service                                        |
| Frontend can't connect to backend   | Verify backend service name matches in `VITE_API_URL` (e.g., `http://backend.railway.internal:8000`) |
| Backend 500 errors                  | Check Railway logs for missing environment variables                                                 |
| "Module not found" on Railway       | Verify `requirements.txt` or `package.json` is correct                                               |
| Frontend build fails                | Check Node version (should use 18+)                                                                  |
| Port binding errors                 | Railway automatically sets `PORT` variable, ensure your app uses it                                  |

## 🔄 Continuous Deployment

Railway is now configured for automatic deployment of both services:

### Both Services (Backend & Frontend)

- Automatically deploy on push to `main` branch
- Monitor deployments in Railway dashboard
- Each service deploys independently when its directory changes
- View logs for each service separately

## 🔧 Making Updates

### Update Backend

1. Make changes to `backend/` files
2. Commit and push to GitHub:
   ```bash
   git add backend/
   git commit -m "Update backend"
   git push
   ```
3. Railway automatically redeploys backend service only

### Update Frontend

1. Make changes to `frontend/` files
2. Commit and push to GitHub:
   ```bash
   git add frontend/
   git commit -m "Update frontend"
   git push
   ```
3. Railway automatically redeploys frontend service only

## 📊 Monitoring

### Railway Dashboard

**Backend Service**:

- View logs: Project → Backend Service → Logs
- Check metrics: CPU, Memory, Network
- View deployments: Deployments tab

**Frontend Service**:

- View logs: Project → Frontend Service → Logs
- Check metrics: CPU, Memory, Network
- View deployments: Deployments tab

### Tips

- Use the **Project Canvas** view to see both services and their connections
- Set up **Notifications** in project settings for deployment failures
- Monitor **Resource Usage** to stay within free tier limits

## 🔒 Security Checklist

- [ ] Never commit `.env` files (check `.gitignore`)
- [ ] API keys are stored as environment variables only
- [ ] HTTPS is enabled (automatic on Railway)
- [ ] Review CORS settings for production
- [ ] Monitor API usage to avoid quota overages

## 💰 Cost Estimate

### Free Tier Limits

**Railway**:

- $5 credit per month (hobby plan)
- Shared across both frontend and backend services
- Typically sufficient for low-traffic apps
- Services sleep after inactivity (5-10 second cold start)
- Private networking is included at no extra cost

**API Costs**:

- Gemini API: Free tier (60 requests/minute)
- Tavily API: Free tier (1000 requests/month)
- Finnhub API: Free tier (60 API calls/minute)

### Scaling Beyond Free Tier

When you need more:

- Railway Pro: $20/month (includes $20 credit)
- Consider caching to reduce API calls
- Monitor usage in Railway dashboard

### Cost Optimization Tips

- Use private networking (no external bandwidth costs)
- Enable auto-sleep for services during low traffic
- Monitor API usage to avoid quota overages
- Consider adding response caching

## 🎉 Success!

Your FinAgent app is now live on Railway! Share your URL:

- **Application**: `https://your-frontend.up.railway.app`
- **Backend API** (if exposed): `https://your-backend.up.railway.app`

## 📚 Next Steps

1. **Custom Domain**: Add your own domain in Railway settings
2. **Monitoring**: Set up uptime monitoring (e.g., UptimeRobot)
3. **Error Tracking**: Consider adding Sentry for error monitoring
4. **Performance**: Add caching layer (Redis on Railway) if needed
5. **Security**: Review CORS settings and API rate limiting

## 🆘 Getting Help

If you encounter issues:

1. **Check logs**: Railway dashboard for both services
2. **Review documentation**: [Backend Setup Guide](Backend%20Setup%20Guide.md)
3. **Test locally**: Ensure everything works on `localhost` first
4. **Verify environment variables**: Double-check all API keys
5. **Check API quotas**: Ensure you haven't exceeded free tier limits

## 📞 Support Resources

- [Railway Documentation](https://docs.railway.app/)
- [Railway Private Networking Guide](https://docs.railway.app/reference/private-networking)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Gemini API Docs](https://ai.google.dev/docs)

---

**Congratulations!** 🎊 Your AI Financial Advisor is now deployed on Railway with secure private networking!
