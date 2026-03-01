# SkySense Premium Weather Application

A high-end, minimalistic weather dashboard with refined Apple-like aesthetics.

## 🚀 Features
- **Premium UI**: Frosted-glass components, soft gradients, and modern typography.
- **Search Autocomplete**: Quickly find weather for any city worldwide.
- **Responsive Diagnostics**: Detailed atmospheric data including humidity, wind, pressure, and visibility.
- **Vercel Optimized**: Ready for instant deployment with environment variable support.

## ⚙️ How to Set Up

### Environment Variables
For direct API access from the client (useful for static hosting like Vercel), set the following variable in your Vercel Dashboard or local `.env` file:

```env
VITE_WEATHERSTACK_API_KEY="your_weatherstack_access_key"
```

**Base URL**: `http://api.weatherstack.com/`

### Running Locally

1. **Install Dependencies**:
   ```bash
   # From root or inside /client or /server
   npm install
   ```

2. **Run Development Server**:
   ```bash
   cd client
   npm run dev
   ```
   *Optional: If using the proxy backend, run `cd server && npm run dev` separately.*

### Deployment to Vercel
This project is configured for a **Unified Deployment** using the `vercel.json` file in the root directory.

1. **Root Directory**: Ensure the root of the repository (`/`) is selected as the Vercel Root Directory.
2. **Environment Variables**: Add your `WEATHERSTACK_ACCESS_KEY` to the Vercel Dashboard to enable the backend API proxy.
3. **Build & Routes**: Vercel will automatically:
   - Build the React client from the `client/` folder.
   - Deploy the Node.js API from the `server/current.js` file as a serverless function at `/api/current`.

## 🛠️ Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS + Framer Motion
- **Icons**: Lucide React
- **Backend (Optional Proxy)**: Node.js + Express
