# 🤖 FinAgent - AI Financial Advisor

A full-stack AI-powered financial analysis application that provides real-time market insights and investment recommendations using Gemini 2.5 Flash, Finnhub, and Tavily APIs.

![Tech Stack](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python-green)
![AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange)

## 🚀 Features

- **AI-Powered Analysis**: Uses Gemini 2.5 Flash with function calling for intelligent financial insights
- **Real-time Market Data**: Integration with Finnhub for live stock, crypto, and forex prices
- **News Sentiment**: Tavily API for up-to-date financial news and sentiment analysis
- **Modern UI**: Beautiful, responsive React frontend built with Tailwind CSS
- **Production Ready**: Configured for deployment on Railway (both frontend and backend with private networking)

## 📁 Project Structure

```
Financial-Advisor/
├── backend/              # FastAPI backend
│   ├── main.py          # Main application file
│   ├── requirements.txt # Python dependencies
│   ├── .env.example     # Environment variables template
│   ├── railway.json     # Railway deployment config
│   └── README.md        # Backend documentation
│
├── frontend/            # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx      # Main application component
│   │   ├── main.tsx     # React entry point
│   │   ├── index.css    # Global styles
│   │   └── services/
│   │       └── api.ts   # API integration layer
│   ├── public/          # Static assets
│   ├── index.html       # HTML entry point
│   ├── package.json     # Node dependencies
│   ├── vite.config.ts   # Vite configuration
│   ├── tsconfig.json    # TypeScript configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── .env.example     # Environment variables template
│   ├── railway.json     # Railway deployment config
│   └── README.md        # Frontend documentation
│
├── docs/                # Additional documentation
│   ├── Project Blueprint.md
│   ├── Backend Setup Guide.md
│   └── DEPLOYMENT.md
│
└── README.md           # This file
```

## 🛠️ Tech Stack

### Backend

- **FastAPI**: Modern Python web framework
- **Gemini 2.5 Flash**: Google's AI model with function calling
- **Finnhub API**: Real-time market data
- **Tavily API**: Financial news search
- **Uvicorn**: ASGI server

### Frontend

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons

## 🏃‍♂️ Quick Start

### Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- API keys:
  - [Google AI Studio](https://makersuite.google.com/app/apikey) (Gemini)
  - [Tavily](https://tavily.com/) (News search)
  - [Finnhub](https://finnhub.io/) (Market data)

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

4. **Run the server**:

   ```bash
   python main.py
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env
   # Default: VITE_API_URL=http://localhost:8000
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

### Testing the Application

1. Make sure both backend and frontend are running
2. Open `http://localhost:5173` in your browser
3. Try queries like:
   - "$NVDA"
   - "Should I buy Tesla stock?"
   - "Bitcoin price analysis"
   - "Forex trends today"

## 🚀 Deployment

### Backend (Railway)

1. **Create a new project** on [Railway](https://railway.app/)
2. **Connect your GitHub repository**
3. **Set the root directory** to `backend`
4. **Add environment variables**:
   - `GOOGLE_API_KEY`
   - `TAVILY_API_KEY`
   - `FINNHUB_API_KEY`
5. **Note the service name** (default: `backend`)

### Frontend (Railway)

1. **Add a new service** to the same Railway project
2. **Connect the same GitHub repository**
3. **Set the root directory** to `frontend`
4. **Add environment variable**:
   - `VITE_API_URL=http://backend.railway.internal:8000`
   - (Replace `backend` with your actual backend service name)
5. **Deploy**: Railway will build and serve the frontend
6. **Generate domain** for public access

### Private Networking

Railway services in the same project can communicate via private network:

- **Format**: `http://<service-name>.railway.internal:<port>`
- **Benefits**: Faster, more secure, no external bandwidth costs
- Frontend → Backend communication happens privately

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed step-by-step instructions.

## 📡 API Endpoints

### Backend

#### `POST /api/analyze`

Analyzes a financial query using the AI agent.

**Request**:

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

#### `GET /health`

Health check endpoint.

**Response**:

```json
{
  "status": "healthy",
  "timestamp": 1708617600.0
}
```

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
GOOGLE_API_KEY=your_google_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
FINNHUB_API_KEY=your_finnhub_api_key_here
PORT=8000
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8000  # or your Railway backend URL
```

## 🧪 Development

### Backend

```bash
cd backend
python main.py
# API docs: http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm run dev
# App: http://localhost:5173
```

### Build for Production

```bash
cd frontend
npm run build
# Output: frontend/dist/
```

## 📚 Documentation

- [Backend Setup Guide](docs/Backend%20Setup%20Guide.md)
- [Project Blueprint](docs/Project%20Blueprint.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is built as a portfolio demonstration piece.

## 🙏 Acknowledgments

- **Gemini 2.5 Flash** by Google AI
- **Finnhub** for market data
- **Tavily** for news search
- **Tailwind CSS** for styling
- **Lucide** for icons

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using FastAPI, React, and Gemini AI
