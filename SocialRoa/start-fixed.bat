@echo off
echo =================================
echo    SocialRoa - Inicio Automatico
echo =================================
echo.

echo [1/3] Iniciando Backend...
cd /d "C:\Users\luis marte\OneDrive\Escritorio\SocialRoa\SocialRoa\backend"
start "SocialRoa Backend" cmd /c "set NODE_PATH= && node src\app.js"

echo [2/3] Esperando 3 segundos para que el backend se inicie...
timeout /t 3 /nobreak

echo [3/3] Iniciando Frontend...
cd /d "C:\Users\luis marte\OneDrive\Escritorio\SocialRoa\SocialRoa\frontend"
start "SocialRoa Frontend" cmd /c "set NODE_PATH= && npm start"

echo.
echo =================================
echo    Servidores iniciados!
echo =================================
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Presiona cualquier tecla para salir...
pause > nul
