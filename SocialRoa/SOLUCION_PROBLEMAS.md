# Guía de Solución de Problemas - SocialRoa

## ✅ Problemas Resueltos:

### 1. Error EADDRINUSE (Puerto 3001 en uso)
**Problema:** El puerto 3001 ya estaba siendo usado por otro proceso.
**Solución:** Terminé el proceso que estaba usando el puerto 3001.

### 2. Configuración de MongoDB
**Problema:** MongoDB Memory Server fallaba.
**Solución:** Modifiqué la configuración para usar MongoDB regular primero, con fallback a Memory Server.

### 3. Servidor Backend
**Estado:** ✅ **FUNCIONANDO** - El servidor está corriendo en http://localhost:3001
**Verificación:** La API responde correctamente en http://localhost:3001/api

## 🚀 Cómo Iniciar la Aplicación:

### Backend (Ya iniciado):
```powershell
cd "c:\Users\luis marte\OneDrive\Documentos\ft\pp\SocialRoa\SocialRoa\backend"
npm start
```

### Frontend (Necesita iniciarse):
```powershell
cd "c:\Users\luis marte\OneDrive\Documentos\ft\pp\SocialRoa\SocialRoa\frontend"
npm start
```

## 🔧 Comandos Útiles:

### Verificar qué proceso usa un puerto:
```powershell
netstat -ano | findstr :3001
```

### Terminar proceso por PID:
```powershell
taskkill /PID <PID> /F
```

### Terminar todos los procesos de Node.js:
```powershell
taskkill /F /IM node.exe
```

### Probar la API:
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api" -Method GET
```

## 📋 Estado Actual:

- ✅ **Backend:** Funcionando en puerto 3001
- ✅ **API:** Responde correctamente
- ✅ **Configuración:** Archivos .env configurados
- ✅ **Rutas:** Todas las rutas configuradas
- ❓ **MongoDB:** Funcionando con fallback (Memory Server)
- ❌ **Frontend:** Necesita iniciarse manualmente

## 🔍 Próximos Pasos:

1. **Iniciar Frontend:** Ejecuta `npm start` en el directorio frontend
2. **Probar UserProfile:** Navega a la página de perfil para verificar funcionamiento
3. **Verificar Autenticación:** Prueba login/registro
4. **Instalar MongoDB (Opcional):** Para producción, instala MongoDB localmente

## 🛠️ Problemas Corregidos en el Código:

### UserProfile.js:
- ✅ Corregida comparación de IDs de usuario
- ✅ Mejorado manejo de errores
- ✅ Mejorado manejo de estados loading/error

### AuthContext.js:
- ✅ Implementada validación de tokens
- ✅ Agregada validación automática

### Backend:
- ✅ Agregada ruta de validación de tokens
- ✅ Mejorada configuración de MongoDB
- ✅ Corregidas importaciones en rutas

## 📞 Si tienes más problemas:

1. Verifica que ambos servidores estén corriendo
2. Verifica que no haya errores en la consola del navegador
3. Verifica que las variables de entorno estén configuradas correctamente
