# FinAgent Frontend

Modern React + TypeScript frontend for the FinAgent AI Financial Advisor application.

## 🛠️ Tech Stack

- **React 18.2**: UI library
- **TypeScript 5.3**: Type safety
- **Vite 5.1**: Fast build tool and dev server
- **Tailwind CSS 3.4**: Utility-first styling
- **Lucide React**: Icon library

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

````env
```env
VITE_API_URL=http://localhost:8000
````

**Deployment options**:

- **Local development**: `http://localhost:8000`
- **Railway (private network)**: `http://backend.railway.internal:8000`
- **Railway (public URL)**: `https://your-backend.railway.app`

See `.env.example` for more details.

### Vite Configuration

The Vite config includes a proxy for local development:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

This allows the frontend to call `/api/*` endpoints without CORS issues during development.

## 📁 Project Structure

```
src/
├── App.tsx           # Main application component
├── main.tsx          # React entry point
├── index.css         # Global styles (Tailwind)
└── services/
    └── api.ts        # API service layer
```

## 🎨 Styling

The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

Key design features:

- Responsive layout
- Modern glassmorphism effects
- Smooth animations
- Accessible color contrast
- Mobile-first approach

## 🔌 API Integration

The frontend communicates with the backend via the API service layer in `src/services/api.ts`.

### Available Functions

#### `analyzeQuery(message: string)`

Sends a financial query to the backend AI agent.

```typescript
import { analyzeQuery } from "./services/api";

const response = await analyzeQuery("Should I buy NVDA?");
console.log(response.text); // AI analysis
```

#### `checkHealth()`

Checks if the backend is available.

```typescript
import { checkHealth } from "./services/api";

const health = await checkHealth();
console.log(health.status); // 'healthy'
```

## 🚀 Deployment

### Railway (Recommended)

The project is configured for Railway deployment with private networking:

1. **Create new service** in your Railway project
2. **Root Directory**: `frontend`
3. **Environment Variables**:
   - `VITE_API_URL=http://backend.railway.internal:8000`
   - (Replace `backend` with your actual backend service name)

The `railway.json` file and build configuration are already set up. Railway will:

- Build the Vite app (`npm run build`)
- Serve it using Express (`npm run start`)
- Connect to backend via private network

## 🧪 Browser Support

- Chrome/Edge/Arc (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📝 TypeScript

TypeScript configuration is in `tsconfig.json`. Strict mode is enabled for better type safety.

## 🎯 Features

- ✅ Real-time financial analysis
- ✅ Responsive design
- ✅ Error handling with user feedback
- ✅ Loading states
- ✅ Type-safe API calls
- ✅ Fast HMR (Hot Module Replacement)
- ✅ Optimized production builds

## 🐛 Troubleshooting

**CORS errors during development:**

- Ensure backend is running on port 8000
- Vite proxy should handle CORS automatically

**Build errors:**

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

**TypeScript errors:**

- Run `npm run build` to see all type errors
- Check `tsconfig.json` for strict mode settings

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
