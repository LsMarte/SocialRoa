@echo off

echo Starting SocialRoa...
echo.

echo Starting backend server...
cd backend
start cmd /k "npm run dev"
cd ..

echo Starting frontend server...
cd frontend
start cmd /k "npm start"
cd ..

echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:3001
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit...
pause
