@echo off
echo ========================================
echo    SUBIR SOCIALROA A GITHUB - ACTUALIZADO
echo ========================================
echo.
echo ✅ Repositorio ya configurado en: https://github.com/LsMarte/SocialRoa
echo.
echo 🚀 Subiendo cambios...

cd /d "c:\Users\luis marte\OneDrive\Escritorio\SocialRoa\SocialRoa"

echo ✅ Agregando archivos...
git add .

echo ✅ Creando commit...
set /p commit_message="Ingresa el mensaje del commit: "
git commit -m "%commit_message%"

echo ✅ Subiendo al repositorio...
git push origin main

echo.
echo 🎉 ¡Proyecto subido exitosamente a GitHub!
echo 🌐 Visita: https://github.com/LsMarte/SocialRoa
echo.
pause
echo    https://github.com/TU_USUARIO/SocialRoa
echo.
echo Presiona cualquier tecla para continuar...
pause > nul

echo.
echo ¿Cual es tu username de GitHub?
set /p username="Ingresa tu username: "

echo.
echo Conectando con GitHub...
git remote add origin https://github.com/%username%/SocialRoa.git

echo.
echo Subiendo codigo a GitHub...
git push -u origin master

echo.
echo ¡Listo! Tu repositorio estará en:
echo https://github.com/%username%/SocialRoa
echo.
pause
