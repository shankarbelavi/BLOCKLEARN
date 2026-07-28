# Quick Google OAuth Setup Checklist

Follow these steps to configure Google OAuth for your BlockLearn application.

## ✅ Prerequisites
- [ ] Node.js and npm installed
- [ ] PostgreSQL database running
- [ ] Google account for Google Cloud Console

---

## 📋 Step-by-Step Configuration

### 1. Google Cloud Console Setup (5-10 minutes)

#### A. Create/Select Project
1. Visit: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Note your project name

#### B. Enable Required APIs
1. Go to: **APIs & Services** > **Library**
2. Search for and enable: **Google+ API** or **Google Identity Services**

#### C. Configure OAuth Consent Screen
1. Go to: **APIs & Services** > **OAuth consent screen**
2. Select **External** user type
3. Fill in required fields:
   - **App name**: BlockLearn
   - **User support email**: [your-email]
   - **Developer contact**: [your-email]
4. Click **Save and Continue**
5. Add scopes: `email`, `profile`, `openid`
6. Add test users (your email addresses)
7. Click **Save and Continue** until done

#### D. Create OAuth 2.0 Client ID
1. Go to: **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Application type: **Web application**
4. Name: `BlockLearn Web Client`
5. **Authorized JavaScript origins**:
   - Add: `http://localhost:5173`
   - Add: `http://localhost:5000` (optional)
6. **Authorized redirect URIs**:
   - Add: `http://localhost:5173`
7. Click **Create**
8. **COPY YOUR CLIENT ID** (looks like: `123456789-abc.apps.googleusercontent.com`)

---

### 2. Backend Configuration

#### A. Create `.env` file
```bash
cd backend
cp .env.example .env
```

#### B. Edit `backend/.env` and add your Google Client ID:
```bash
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
```

#### C. Verify other required variables are set:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `JWT_SECRET`
- `EMAIL_USER`, `EMAIL_PASS`
- `FRONTEND_URL=http://localhost:5173`

---

### 3. Frontend Configuration

#### A. Create `.env` file
```bash
cd frontend
cp .env.example .env
```

#### B. Edit `frontend/.env` and add your Google Client ID:
```bash
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
```

---

### 4. Install Dependencies (if not already done)

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

---

### 5. Start the Application

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

---

### 6. Test Google OAuth

1. Open browser: http://localhost:5173
2. Navigate to Login page
3. Click **"Sign in with Google"** button
4. Select your Google account
5. Grant permissions
6. You should be redirected to dashboard

---

## 🔍 Verification Commands

### Check Backend Configuration:
```bash
curl http://localhost:5000/api/auth/google-config
```
Should return: `{"success":true,"hasClientId":true,...}`

### Check Backend Health:
```bash
curl http://localhost:5000/api/health
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Google Client ID is missing"
**Solution:** 
- Verify `GOOGLE_CLIENT_ID` is set in `backend/.env`
- Restart backend server after adding the variable

### Issue 2: Google button not showing
**Solution:**
- Verify `VITE_GOOGLE_CLIENT_ID` is set in `frontend/.env`
- Restart frontend dev server
- Clear browser cache

### Issue 3: "400 Error - redirect_uri_mismatch"
**Solution:**
- In Google Cloud Console, add `http://localhost:5173` to **Authorized JavaScript origins**
- Add `http://localhost:5173` to **Authorized redirect URIs**

### Issue 4: "Access blocked: This app's request is invalid"
**Solution:**
- Complete OAuth consent screen configuration
- Add yourself as a test user
- Make sure all required scopes are added

---

## 📝 Important Notes

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use the same Client ID** in both frontend and backend `.env` files
3. **Restart servers** after changing `.env` files
4. **Test users** - Add your email as a test user in OAuth consent screen during development
5. **Production** - Create separate OAuth credentials for production with your production domain

---

## 🎉 Success Indicators

✅ Backend starts without errors  
✅ Frontend shows Google Sign-In button  
✅ Clicking Google button opens Google login popup  
✅ After login, redirected to dashboard  
✅ User data stored in database  

---

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth Google Library](https://www.npmjs.com/package/@react-oauth/google)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Check backend terminal for errors
3. Verify all environment variables are set correctly
4. Review the detailed guide: `GOOGLE_OAUTH_SETUP.md`
