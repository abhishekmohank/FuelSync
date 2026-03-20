@echo off
REM Diet Tracker - Full Stack Application Builder (Windows)
REM This script helps set up both backend and frontend

echo.
echo 🎯 Diet Tracker - Setup Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Node.js is not installed. Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%
echo.

REM Backend Setup
echo Setting up Backend...
cd diet-backend

if not exist ".env" (
    copy .env.example .env
    echo ✓ Created .env file
    echo ⚠️  Please update .env with your credentials:
    echo    - MONGODB_URI
    echo    - OPENAI_API_KEY
    echo    - JWT_SECRET
) else (
    echo ✓ .env file exists
)

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    echo ✓ Backend dependencies installed
) else (
    echo ✓ Backend dependencies already installed
)

cd ..
echo.

REM Frontend Setup
echo Setting up Frontend...
cd diet-frontend

if not exist ".env.local" (
    copy .env.example .env.local
    echo ✓ Created .env.local file
) else (
    echo ✓ .env.local file exists
)

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    echo ✓ Frontend dependencies installed
) else (
    echo ✓ Frontend dependencies already installed
)

cd ..
echo.

REM Summary
echo ================================
echo ✓ Setup Complete!
echo ================================
echo.
echo Next steps:
echo.
echo 1. Backend Setup:
echo    cd diet-backend
echo    Update .env with your credentials
echo    npm run dev
echo.
echo 2. Frontend Setup (in another terminal):
echo    cd diet-frontend
echo    npm run dev
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
echo Documentation:
echo    - README.md          - Full documentation
echo    - QUICKSTART.md      - Quick start guide
echo    - DEPLOYMENT.md      - Deployment instructions
echo    - ARCHITECTURE.md    - System architecture
echo.
pause
