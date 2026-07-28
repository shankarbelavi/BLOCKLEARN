# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your BlockLearn application.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity API)

## Step 2: Configure OAuth Consent Screen

1. In the Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace)
3. Fill in the required information:
   - App name: BlockLearn
   - User support email: your email
   - Developer contact information: your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (your email addresses) if in testing mode

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - For development: `http://localhost:5173`
   - For production: `https://yourdomain.com`
5. Add authorized redirect URIs:
   - For development: `http://localhost:5173`
   - For production: `https://yourdomain.com`
6. Copy the Client ID (it will look like: `xxxxx.apps.googleusercontent.com`)

## Step 4: Configure Environment Variables

### Backend (.env file)
Create a `.env` file in your backend directory (copy from `.env.example`):
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skill_swap_db
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Campus Email Domains
CAMPUS_EMAIL_DOMAINS=saividya.ac.in,saividhya.ac.in

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

### Frontend (.env file)
Create a `.env` file in your frontend directory (copy from `.env.example`):
```bash
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com

# API Configuration
VITE_API_URL=http://localhost:5000/api
```

**Important:** Replace `your_google_client_id_here.apps.googleusercontent.com` with your actual Google Client ID from Google Cloud Console.

## Step 5: Test the Integration

1. Start your backend server: `npm run dev` (in backend directory)
2. Start your frontend: `npm run dev` (in frontend directory)
3. Go to the login page and click "Sign in with Google"
4. Complete the Google OAuth flow

## Features

✅ **Direct Google Login**: Users can sign in with their Google account without OTP
✅ **Automatic Account Creation**: New users are automatically created when they first sign in with Google
✅ **Seamless Integration**: Works alongside existing OTP-based authentication
✅ **Secure**: Uses Google's OAuth 2.0 protocol for secure authentication

## Troubleshooting

### Common Issues

**400 Error - "The server cannot process the request"**
- Check that your Google Client ID is correctly set in both frontend and backend
- Verify the Google Client ID is valid by visiting: `http://localhost:5000/api/auth/google-config`
- Ensure your redirect URIs match your application URLs
- Check that the Google+ API is enabled in your Google Cloud project
- Verify that your OAuth consent screen is properly configured

**Google Login Button Not Showing**
- Check browser console for JavaScript errors
- Verify that `VITE_GOOGLE_CLIENT_ID` is set in your frontend `.env` file
- Ensure the Google OAuth provider is properly configured in `main.jsx`

**"Invalid Client" Error**
- Double-check your Google Client ID in Google Cloud Console
- Make sure you're using the correct Client ID (not the Client Secret)
- Verify the Client ID is for a "Web application" type

### Debug Steps

1. **Check Backend Configuration:**
   ```bash
   curl http://localhost:5000/api/auth/google-config
   ```

2. **Check Frontend Configuration:**
   - Open browser developer tools
   - Check if `VITE_GOOGLE_CLIENT_ID` is loaded
   - Look for any JavaScript errors in console

3. **Verify Google Cloud Setup:**
   - Go to Google Cloud Console > APIs & Services > Credentials
   - Check that your OAuth 2.0 Client ID is active
   - Verify authorized redirect URIs include your domain

## Security Notes

- Never commit your `.env` files to version control
- Use different Client IDs for development and production
- Regularly rotate your JWT secrets
- Monitor your Google Cloud Console for any suspicious activity
