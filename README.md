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
1. Ensure the `client` folder is selected as the **Root Directory** in Vercel.
2. Add your `VITE_WEATHERSTACK_API_KEY` to the **Environment Variables** section.
3. Vercel will automatically detect Vite and build the project.

## 🛠️ Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS + Framer Motion
- **Icons**: Lucide React
- **Backend (Optional Proxy)**: Node.js + Express
