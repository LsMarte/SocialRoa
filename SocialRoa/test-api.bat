@echo off
echo ==========================================
echo    Probando API de SocialRoa
echo ==========================================
echo.

echo [1/3] Verificando si el backend está corriendo...
curl -s http://localhost:3001/api >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: El backend no está corriendo en puerto 3001
    echo Por favor ejecuta 'start-backend-improved.bat' primero
    pause
    exit /b 1
)
echo ✓ Backend está corriendo

echo.
echo [2/3] Probando endpoint de la API...
echo Respuesta del servidor:
curl -s http://localhost:3001/api
echo.

echo.
echo [3/3] Probando registro de usuario de prueba...
echo Enviando datos de registro...
curl -X POST http://localhost:3001/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"test_user\",\"email\":\"test@example.com\",\"password\":\"TestPass123!\"}" ^
  -w "\nCódigo de respuesta: %%{http_code}\n"

echo.
echo ==========================================
echo          PRUEBAS COMPLETADAS
echo ==========================================
pause
