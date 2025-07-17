@echo off
echo ==========================================
echo    SocialRoa Backend Startup Script
echo ==========================================
echo.

echo [1/5] Cambiando al directorio del backend...
cd /d "c:\Users\luis marte\OneDrive\Escritorio\SocialRoa\SocialRoa\backend"
echo Directorio actual: %cd%
echo.

echo [2/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado o no está en el PATH
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js encontrado

echo.
echo [3/5] Verificando dependencias...
if not exist node_modules (
    echo Instalando dependencias del backend...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Falló la instalación de dependencias
        pause
        exit /b 1
    )
) else (
    echo ✓ Dependencias ya instaladas
)

echo.
echo [4/5] Verificando MongoDB...
echo Nota: La aplicación usará MongoDB Memory Server como fallback si MongoDB local no está disponible

echo.
echo [5/5] Iniciando servidor backend...
echo Servidor iniciándose en: http://localhost:3001
echo Presiona Ctrl+C para detener el servidor
echo.
echo ==========================================
echo          SERVIDOR BACKEND ACTIVO
echo ==========================================
echo.

npm start
