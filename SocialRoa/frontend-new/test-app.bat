@echo off
echo ============================================
echo        Testing SocialRoa Frontend
echo ============================================
echo.

echo [1/4] Checking current directory...
cd /d "%~dp0"
echo Current directory: %CD%
echo.

echo [2/4] Checking Node.js and npm versions...
node --version
npm --version
echo.

echo [3/4] Installing dependencies...
npm install
echo.

echo [4/4] Starting application...
echo The application should open at http://localhost:3000
echo Press Ctrl+C to stop the application
echo.

npm start

pause
