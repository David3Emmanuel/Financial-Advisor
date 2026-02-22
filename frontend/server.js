// Simple Express server for serving the built frontend on Railway
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Backend URL for private Railway networking
// Use private network in production: http://backend.railway.internal:8000
// Use localhost for development: http://localhost:8000
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

console.log(`Backend URL configured as: ${BACKEND_URL}`);

// Parse JSON request bodies for API proxy
app.use(express.json());

// API Proxy Routes - Forward requests to backend service
// This enables Railway private networking (browsers can't access .railway.internal directly)

app.post("/api/analyze", async (req, res) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error proxying to backend:", error);
    res.status(502).json({
      error: "Bad Gateway",
      message: "Failed to connect to backend service",
    });
  }
});

app.get("/health", async (req, res) => {
  try {
    const response = await fetch(`${BACKEND_URL}/health`);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Error checking backend health:", error);
    res.status(502).json({
      error: "Bad Gateway",
      message: "Backend is not available",
    });
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle client-side routing - send all requests to index.html
// Must be last to not interfere with API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend server is running on port ${PORT}`);
  console.log(`Proxying API requests to: ${BACKEND_URL}`);
});
