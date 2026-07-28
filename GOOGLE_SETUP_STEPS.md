# 🚨 URGENT: Google OAuth Setup Required

## The Problem
Your application is getting a 400 error because the **Google Client ID is missing**. This is required for Google OAuth to work.

## Quick Fix Steps

### Step 1: Get Google Client ID (5 minutes)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or select existing one)
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click "Enable"

4. **Create OAuth Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5173` (for development)
     - `http://localhost:3000` (if using different port)
   - Click "Create"

5. **Copy the Client ID** (it looks like: `123456789-abcdefg.apps.googleusercontent.com`)

### Step 2: Update Environment Variables

**Backend (.env file)**:
```env
GOOGLE_CLIENT_ID=your_actual_client_id_here
```

**Frontend (.env file)**:
```env
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here
```

### Step 3: Restart Your Servers

```bash
# Stop both servers (Ctrl+C)
# Then restart:

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Step 4: Test the Configuration

Visit: http://localhost:5000/api/auth/google-config

You should see:
```json
{
  "success": true,
  "hasClientId": true,
  "clientIdLength": 72,
  "message": "Google Client ID is configured"
}
```

## If You Still Get 400 Error

1. **Check the browser console** for JavaScript errors
2. **Verify the Client ID** is correct (no extra spaces)
3. **Make sure both servers are restarted** after adding environment variables
4. **Check that the Google OAuth consent screen** is configured

## Need Help?

If you're still having issues:
1. Share the output of: `http://localhost:5000/api/auth/google-config`
2. Check browser console for any JavaScript errors
3. Make sure your Google Cloud project has the OAuth consent screen configured

## Quick Test

Once configured, go to your login page and click "Sign in with Google". You should see a Google popup instead of a 400 error.
