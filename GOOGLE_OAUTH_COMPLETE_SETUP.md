# 🔧 Complete Google OAuth Setup Guide

## The Problem
You're getting a 400 error because Google OAuth is not properly configured. This guide will fix it step by step.

## 🚀 Step-by-Step Solution

### Step 1: Create Google Cloud Project (5 minutes)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Click "Select a project"** → **"New Project"**
3. **Name your project**: `BlockLearn` (or any name you prefer)
4. **Click "Create"**

### Step 2: Enable Google Identity API (2 minutes)

1. **Go to "APIs & Services"** → **"Library"**
2. **Search for**: `Google Identity`
3. **Click on "Google Identity"**
4. **Click "Enable"**

### Step 3: Configure OAuth Consent Screen (3 minutes)

1. **Go to "APIs & Services"** → **"OAuth consent screen"**
2. **Choose "External"** → **"Create"**
3. **Fill in the form**:
   - **App name**: `BlockLearn`
   - **User support email**: Your email
   - **Developer contact**: Your email
4. **Click "Save and Continue"**
5. **Scopes**: Click "Add or Remove Scopes"
   - Add: `email`, `profile`, `openid`
6. **Click "Save and Continue"**
7. **Test users**: Add your email address
8. **Click "Save and Continue"**

### Step 4: Create OAuth Credentials (3 minutes)

1. **Go to "APIs & Services"** → **"Credentials"**
2. **Click "Create Credentials"** → **"OAuth 2.0 Client IDs"**
3. **Application type**: Choose "Web application"
4. **Name**: `BlockLearn Web Client`
5. **Authorized redirect URIs**: Add these URLs:
   - `http://localhost:5173`
   - `http://localhost:3000`
   - `http://localhost:5174`
6. **Click "Create"**
7. **Copy the Client ID** (it looks like: `123456789-abcdefg.apps.googleusercontent.com`)

### Step 5: Update Environment Variables (2 minutes)

**Backend `.env` file** (replace the placeholder):
```env
GOOGLE_CLIENT_ID=your_actual_client_id_here
```

**Frontend `.env` file** (replace the placeholder):
```env
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here
```

### Step 6: Restart Your Servers (1 minute)

```bash
# Stop both servers (Ctrl+C in both terminals)

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend  
npm run dev
```

### Step 7: Test the Configuration

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

### Step 8: Enable Google Login

Once the configuration is working, I'll re-enable the Google login button.

## 🔍 Troubleshooting

### If you still get 400 error:

1. **Check the Client ID**: Make sure it's exactly like: `123456789-abcdefg.apps.googleusercontent.com`
2. **Verify redirect URIs**: Must include `http://localhost:5173`
3. **Check OAuth consent screen**: Must be configured and published
4. **Verify API is enabled**: Google Identity API must be enabled

### Common Issues:

- **"Invalid client"**: Wrong Client ID or not configured properly
- **"Redirect URI mismatch"**: Add the correct redirect URI
- **"Access blocked"**: OAuth consent screen not configured

## ✅ Success Checklist

- [ ] Google Cloud project created
- [ ] Google Identity API enabled  
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Client ID created
- [ ] Client ID added to backend `.env`
- [ ] Client ID added to frontend `.env`
- [ ] Both servers restarted
- [ ] Configuration test passes
- [ ] Google login button works

## 🎯 Next Steps

Once you complete these steps:
1. The 400 error will be resolved
2. Google login will work perfectly
3. Users can sign in with Google without OTP
4. New users will be automatically created

**Need help?** Share the output of `http://localhost:5000/api/auth/google-config` and I'll help you debug further!
