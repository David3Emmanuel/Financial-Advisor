# 🚀 Complete Deployment Guide

Step-by-step guide for deploying the FinAgent application to production.

## 📋 Overview

- **Backend**: Railway (Python + FastAPI)
- **Frontend**: Vercel (React + Vite)
- **Total time**: ~15-20 minutes

## 🎯 Prerequisites

Before you begin, ensure you have:

- [ ] GitHub account
- [ ] Railway account (sign up at [railway.app](https://railway.app/))
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com/))
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

### Step 5: Get Backend URL

1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy the URL (e.g., `https://finagent-backend.up.railway.app`)
4. **Save this URL** - you'll need it for frontend deployment

### Step 6: Test Backend

```bash
# Replace with your actual Railway URL
curl https://your-backend.up.railway.app/health

# Should return:
# {"status":"healthy","timestamp":1708617600.0}
```

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Project

1. Go to [vercel.com](https://vercel.com/)
2. Click **"Add New..."** → **"Project"**
3. Import your `Financial-Advisor` repository from GitHub
4. Authorize GitHub if needed

### Step 2: Configure Build Settings

In the "Configure Project" screen:

1. **Framework Preset**: Vite
2. **Root Directory**: Click **"Edit"** and enter: `frontend`
3. **Build Command**: `npm run build` (should auto-fill)
4. **Output Directory**: `dist` (should auto-fill)
5. **Install Command**: `npm install` (should auto-fill)

### Step 3: Add Environment Variable

1. Expand **"Environment Variables"**
2. Add variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Railway backend URL (from Part 1, Step 5)
   - Example: `https://finagent-backend.up.railway.app`
3. Make sure to select all environments (Production, Preview, Development)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Vercel will show a preview URL when done

### Step 5: Test Frontend

1. Click the preview URL Vercel provides
2. Try a sample query like "$NVDA" or "Should I buy Bitcoin?"
3. Verify it connects to your backend and returns analysis

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

1. **Open your Vercel URL** in a browser
2. **Test search**:
   - Enter "$BTC" in search box
   - Click "Analyze"
   - Should show analysis after a few seconds
3. **Check browser console**:
   - Press F12 → Console tab
   - Should have no CORS errors
4. **Test error handling**:
   - If backend is down, should show error message

### Common Issues

| Issue | Solution |
|-------|----------|
| Frontend shows "API request failed" | Check `VITE_API_URL` in Vercel environment variables |
| CORS errors | Verify backend `allow_origins=["*"]` in `main.py` |
| Backend 500 errors | Check Railway logs for missing environment variables |
| "Module not found" on Railway | Verify `requirements.txt` is correct |
| Frontend build fails | Check Node version (should use 18+) |

## 🔄 Continuous Deployment

Both platforms are now configured for automatic deployment:

### Railway (Backend)
- Automatically deploys on push to `main` branch
- Monitor deployments in Railway dashboard

### Vercel (Frontend)
- Automatically deploys on push to `main` branch
- Preview deployments for pull requests
- Monitor deployments in Vercel dashboard

## 🔧 Making Updates

### Update Backend

1. Make changes to `backend/` files
2. Commit and push to GitHub:
   ```bash
   git add backend/
   git commit -m "Update backend"
   git push
   ```
3. Railway automatically redeploys

### Update Frontend

1. Make changes to `frontend/` files
2. Commit and push to GitHub:
   ```bash
   git add frontend/
   git commit -m "Update frontend"
   git push
   ```
3. Vercel automatically redeploys

## 📊 Monitoring

### Railway Dashboard
- View logs: Project → Service → Logs
- Check metrics: CPU, Memory, Network
- View deployments: Deployments tab

### Vercel Dashboard
- View deployments: Project → Deployments
- Check analytics: Analytics tab (requires Pro)
- View logs: Deployment → Function Logs

## 🔒 Security Checklist

- [ ] Never commit `.env` files (check `.gitignore`)
- [ ] API keys are stored as environment variables only
- [ ] HTTPS is enabled (automatic on Railway/Vercel)
- [ ] Review CORS settings for production
- [ ] Monitor API usage to avoid quota overages

## 💰 Cost Estimate

### Free Tier Limits

**Railway**:
- $5 credit per month (hobby plan)
- Typically sufficient for low-traffic apps
- Sleeps after inactivity (5-10 second cold start)

**Vercel**:
- 100 GB bandwidth per month
- Unlimited deployments
- Free for personal projects

**API Costs**:
- Gemini API: Free tier (60 requests/minute)
- Tavily API: Free tier (1000 requests/month)
- Finnhub API: Free tier (60 API calls/minute)

### Scaling Beyond Free Tier

When you need more:
- Railway Pro: $20/month
- Vercel Pro: $20/month per user
- Consider caching to reduce API calls

## 🎉 Success!

Your FinAgent app is now live! Share your URLs:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.up.railway.app`

## 📚 Next Steps

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Analytics**: Enable Vercel Analytics for usage tracking
3. **Monitoring**: Set up uptime monitoring (e.g., UptimeRobot)
4. **Error Tracking**: Consider adding Sentry for error monitoring
5. **Performance**: Add caching layer (Redis) if needed

## 🆘 Getting Help

If you encounter issues:

1. **Check logs**: Railway and Vercel dashboards
2. **Review documentation**: [Backend Setup Guide](Backend%20Setup%20Guide.md)
3. **Test locally**: Ensure everything works on `localhost` first
4. **Verify environment variables**: Double-check all API keys
5. **Check API quotas**: Ensure you haven't exceeded free tier limits

## 📞 Support Resources

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Gemini API Docs](https://ai.google.dev/docs)

---

**Congratulations!** 🎊 Your AI Financial Advisor is now deployed and ready to analyze markets!
