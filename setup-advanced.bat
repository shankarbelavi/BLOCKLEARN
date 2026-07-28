@echo off
echo 🚀 BlockLearn Advanced Features Setup
echo ====================================
echo.

REM Check if .env exists
if not exist .env (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created!
) else (
    echo 📝 .env file already exists
)

echo.
echo 🔑 To enable GPT-4 and advanced AI features:
echo    1. Get your OpenAI API key from: https://platform.openai.com/api-keys
echo    2. Edit the .env file and add: OPENAI_API_KEY=your_key_here
echo.
echo 🎯 Advanced Features Available:
echo    ✅ GPT-4 powered AI responses
echo    ✅ Voice emotion detection
echo    ✅ Multi-modal content analysis
echo    ✅ Advanced learning recommendations
echo    ✅ External resource integration
echo    ✅ Multi-language support
echo.
echo 🌐 Test the Advanced Features:
echo    1. Start both servers (already running)
echo    2. Visit: http://localhost:5173
echo    3. Click the blue chat button
echo    4. Try: 'Help me learn React' or upload an image
echo.
echo 🎉 Your BlockLearn platform is ready with advanced AI!
echo.
echo 📋 Quick Commands:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000/api
echo.
echo Happy learning! 🎓✨
pause
