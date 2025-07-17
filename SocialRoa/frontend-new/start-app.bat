@echo off
echo Starting SocialRoa Frontend...
echo.

echo Checking node version...
node --version
echo.

echo Checking npm version...
npm --version
echo.

echo Installing dependencies...
npm install

echo.
echo Starting application...
npm start

pause
