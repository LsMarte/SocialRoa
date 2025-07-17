# 🚀 Guía para Subir SocialRoa a GitHub

## 📋 Paso 1: Crear el Repositorio en GitHub

### Opción A: Crear desde GitHub.com (Recomendado)
1. Ve a [GitHub.com](https://github.com)
2. Haz clic en el botón **"New"** o **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Completa la información:
   - **Repository name**: `SocialRoa`
   - **Description**: `🌟 Complete social media platform built with React, Node.js, Express, MongoDB and React Native`
   - **Visibility**: Public (para que otros puedan ver tu proyecto)
   - **NO** marques "Initialize this repository with a README" (ya tenemos uno)
5. Haz clic en **"Create repository"**

### Opción B: Usar GitHub CLI (Si tienes GitHub CLI instalado)
```bash
gh repo create SocialRoa --public --description "🌟 Complete social media platform built with React, Node.js, Express, MongoDB and React Native"
```

## 📋 Paso 2: Conectar y Subir el Repositorio

Una vez que tengas el repositorio creado en GitHub, ejecuta estos comandos:

```bash
# Añadir el repositorio remoto (reemplaza TU_USUARIO con tu username de GitHub)
git remote add origin https://github.com/TU_USUARIO/SocialRoa.git

# Verificar que el remote se añadió correctamente
git remote -v

# Subir el código a GitHub
git push -u origin master
```

## 📋 Paso 3: Configurar el Repositorio (Opcional)

### Añadir Topics al Repositorio
En GitHub, ve a tu repositorio y añade estos topics:
- `react`
- `nodejs`
- `express`
- `mongodb`
- `react-native`
- `social-media`
- `full-stack`
- `javascript`
- `tailwind-css`
- `socket-io`
- `jwt`

### Configurar GitHub Pages (Si quieres hosting gratuito)
1. Ve a **Settings** → **Pages**
2. Selecciona **Deploy from a branch**
3. Selecciona **master branch**
4. Selecciona **/ (root)**

## 📋 Paso 4: Después de Subir

### Actualizar el README.md
1. Reemplaza `TU_USUARIO` en el README.md con tu username real de GitHub
2. Actualiza los enlaces del proyecto
3. Haz un commit y push:
```bash
git add README.md
git commit -m "Update README with correct GitHub username"
git push
```

### Añadir Capturas de Pantalla
1. Crea una carpeta `screenshots` en la raíz del proyecto
2. Toma capturas de pantalla de tu aplicación
3. Añádelas al repositorio:
```bash
git add screenshots/
git commit -m "Add application screenshots"
git push
```

## 🎉 ¡Listo!

Tu proyecto SocialRoa estará disponible en:
`https://github.com/TU_USUARIO/SocialRoa`

## 📝 Comandos Útiles para el Futuro

```bash
# Para hacer cambios futuros
git add .
git commit -m "Describe your changes"
git push

# Para crear una nueva rama
git checkout -b feature-name

# Para hacer un pull request
git push -u origin feature-name
```

## 🔧 Problemas Comunes

### Error: "remote origin already exists"
```bash
git remote rm origin
git remote add origin https://github.com/TU_USUARIO/SocialRoa.git
```

### Error: "Authentication failed"
- Asegúrate de estar autenticado en GitHub
- Puede que necesites crear un Personal Access Token
- Ve a GitHub → Settings → Developer settings → Personal access tokens

### Error: "Permission denied"
- Verifica que el repositorio existe
- Verifica que tienes permisos de escritura
- Verifica tu username en la URL

## 🎯 Siguiente Paso

Una vez que hayas creado el repositorio en GitHub, ejecuta:
```bash
git remote add origin https://github.com/TU_USUARIO/SocialRoa.git
git push -u origin master
```

¡Tu código estará en GitHub y listo para compartir! 🚀
