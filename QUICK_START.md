# 🚀 Quick Start - Google OAuth Configuration

## Current Status

✅ **Frontend configured** - Google Client ID already set in `frontend/.env`  
⚠️ **Backend needs configuration** - Need to create `backend/.env`

Your Google Client ID: `600190604921-1ecm9djtasjj0fvagqen4j7s4jai24a7.apps.googleusercontent.com`

---

## 🎯 Quick Setup (2 minutes)

### Option 1: Automated Setup (Recommended)

Run the PowerShell script to automatically create `backend/.env`:

```powershell
.\create-backend-env.ps1
```

This will:
- ✅ Create `backend/.env` with your Google Client ID
- ✅ Include all required environment variables
- ✅ Use the same Client ID from your frontend

Then edit `backend/.env` and update:
- `DB_PASSWORD` - Your PostgreSQL password
- `JWT_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `EMAIL_USER` and `EMAIL_PASS` - For sending OTP emails

### Option 2: Manual Setup

1. **Copy the example file:**
   ```powershell
   cd backend
   Copy-Item .env.example .env
   ```

2. **Edit `backend/.env` and set:**
   ```
   GOOGLE_CLIENT_ID=600190604921-1ecm9djtasjj0fvagqen4j7s4jai24a7.apps.googleusercontent.com
   DB_PASSWORD=your_postgres_password
   JWT_SECRET=your_generated_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

---

## ▶️ Start Your Application

### Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```

Expected output:
```
Server is running on port 5000
```

### Terminal 2 - Frontend:
```powershell
cd frontend
npm run dev
```

Expected output:
```
VITE v7.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

## ✅ Verify Configuration

### 1. Check Backend Google OAuth Config:
```powershell
curl http://localhost:5000/api/auth/google-config
```

Expected response:
```json
{
  "success": true,
  "hasClientId": true,
  "clientIdLength": 72,
  "message": "Google Client ID is configured"
}
```

### 2. Check Backend Health:
```powershell
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "message": "BlockLearn API is running!"
}
```

### 3. Test Frontend:
1. Open: http://localhost:5173
2. Navigate to Login page
3. You should see the **"Sign in with Google"** button
4. Click it and sign in with your Google account
5. You should be redirected to the dashboard ✅

---

## 🔧 Configuration Files

### Files Already Configured:
- ✅ `frontend/.env` - Contains `VITE_GOOGLE_CLIENT_ID`
- ✅ `frontend/src/main.jsx` - GoogleOAuthProvider configured
- ✅ `frontend/src/Login.jsx` - Google Sign-In button implemented
- ✅ `backend/routes/auth.js` - Google OAuth endpoint implemented
- ✅ `backend/.env.example` - Template with all variables

### Files You Need to Create:
- ⚠️ `backend/.env` - Copy from `.env.example` and configure

---

## 📋 What's Already Implemented

### Backend Features:
- ✅ Google OAuth endpoint: `POST /api/auth/google`
- ✅ Token verification using `google-auth-library`
- ✅ Automatic user creation for new Google sign-ins
- ✅ JWT token generation
- ✅ Email verification check
- ✅ Debug endpoint for configuration check

### Frontend Features:
- ✅ Google Sign-In button on login page
- ✅ `@react-oauth/google` library integrated
- ✅ Success/error handlers
- ✅ Automatic redirect to dashboard
- ✅ Token storage in localStorage
- ✅ Beautiful UI with loading states

### Security:
- ✅ `.gitignore` configured (`.env` files excluded)
- ✅ Email verification requirement
- ✅ Secure token verification
- ✅ JWT session management
- ✅ CORS configuration

---

## 🎯 Testing Checklist

- [ ] Backend `.env` file created and configured
- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] `/api/auth/google-config` returns `hasClientId: true`
- [ ] Google Sign-In button visible on login page
- [ ] Can click Google button and see Google login popup
- [ ] Can successfully sign in with Google account
- [ ] Redirected to dashboard after login
- [ ] User data stored in database

---

## 🐛 Common Issues

### Issue: "Google Client ID is missing"
**Solution:** Run `.\create-backend-env.ps1` or manually create `backend/.env`

### Issue: Backend won't start
**Solution:** 
1. Check PostgreSQL is running
2. Verify database credentials in `backend/.env`
3. Check backend terminal for specific errors

### Issue: Google button not showing
**Solution:**
1. Check browser console for errors
2. Verify `VITE_GOOGLE_CLIENT_ID` in `frontend/.env`
3. Restart frontend dev server

### Issue: "redirect_uri_mismatch"
**Solution:**
1. Go to Google Cloud Console: https://console.cloud.google.com/apis/credentials
2. Edit your OAuth 2.0 Client ID
3. Add `http://localhost:5173` to **Authorized JavaScript origins**
4. Add `http://localhost:5173` to **Authorized redirect URIs**

---

## 📚 Documentation

- **`QUICK_START.md`** (this file) - Quick setup guide
- **`setup-google-oauth.md`** - Detailed step-by-step checklist
- **`GOOGLE_OAUTH_SETUP.md`** - Comprehensive guide with troubleshooting
- **`OAUTH_CONFIGURATION_SUMMARY.md`** - Technical overview

---

## 🎉 Success!

Once you complete the setup:
1. Users can sign in with Google in one click
2. No password required
3. Automatic account creation
4. Secure authentication
5. Beautiful user experience

---

## 📞 Need Help?

1. Check backend terminal for errors
2. Check frontend browser console for errors
3. Verify all environment variables are set
4. Review the detailed guides in the documentation files
5. Test the configuration endpoint: `/api/auth/google-config`

---

**Last Updated:** 2025-10-02  
**Status:** ✅ Ready to configure and test
