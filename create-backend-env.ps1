# PowerShell script to create backend .env file with Google OAuth configuration

$envContent = @"
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skill_swap_db
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT Secret (Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your_secure_random_secret_key_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
# Optional: Use EMAIL_SERVICE for well-known services
# EMAIL_SERVICE=gmail

# Campus Email Domains (comma-separated)
CAMPUS_EMAIL_DOMAINS=saividya.ac.in,saividhya.ac.in

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Google OAuth Configuration
# Using the same Client ID from frontend/.env
GOOGLE_CLIENT_ID=600190604921-1ecm9djtasjj0fvagqen4j7s4jai24a7.apps.googleusercontent.com
"@

$backendPath = Join-Path $PSScriptRoot "backend"
$envPath = Join-Path $backendPath ".env"

if (Test-Path $envPath) {
    Write-Host "⚠️  backend/.env already exists!" -ForegroundColor Yellow
    $response = Read-Host "Do you want to overwrite it? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "❌ Cancelled. No changes made." -ForegroundColor Red
        exit
    }
}

# Create backend directory if it doesn't exist
if (-not (Test-Path $backendPath)) {
    New-Item -ItemType Directory -Path $backendPath -Force | Out-Null
}

# Write the .env file
Set-Content -Path $envPath -Value $envContent -NoNewline

Write-Host "✅ Created backend/.env file successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit backend/.env and update the following:" -ForegroundColor White
Write-Host "   - DB_PASSWORD (your PostgreSQL password)" -ForegroundColor Yellow
Write-Host "   - JWT_SECRET (generate a secure random key)" -ForegroundColor Yellow
Write-Host "   - EMAIL_USER and EMAIL_PASS (for sending OTP emails)" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. The Google Client ID has been automatically added from frontend/.env" -ForegroundColor Green
Write-Host ""
Write-Host "3. Start your backend server:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Verify Google OAuth configuration:" -ForegroundColor White
Write-Host "   curl http://localhost:5000/api/auth/google-config" -ForegroundColor Gray
