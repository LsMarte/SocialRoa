# 🌟 SocialRoa - Red Social Moderna

Una plataforma de red social completa construida con React, Node.js, Express, MongoDB y React Native.

## 🚀 Características Principales

- **🔐 Sistema de Autenticación**: Registro y login con JWT
- **📱 Aplicación Móvil**: React Native con NativeWind
- **💬 Mensajería en Tiempo Real**: Chat privado con Socket.io
- **📸 Historias**: Compartir momentos que desaparecen
- **🎥 Transmisión en Vivo**: Broadcasting en tiempo real
- **🖼️ Compartir Multimedia**: Subida de fotos y videos
- **👤 Perfiles de Usuario**: Gestión completa de perfiles
- **🎨 Diseño Moderno**: Tailwind CSS con modo oscuro

## 📁 Estructura del Proyecto

```
SocialRoa/
├── backend/                 # API Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/    # Controladores de API
│   │   ├── models/         # Modelos de MongoDB
│   │   ├── routes/         # Rutas de API
│   │   ├── middleware/     # Middleware personalizado
│   │   └── utils/          # Utilidades
│   └── package.json
├── frontend/               # Aplicación Web (React)
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas principales
│   │   ├── context/        # Context API
│   │   ├── hooks/          # Hooks personalizados
│   │   └── utils/          # Utilidades frontend
│   └── package.json
├── frontend-new/           # Frontend alternativo
├── SocialRoaMobile/        # App Mobile (React Native)
│   ├── src/
│   │   └── components/     # Componentes mobile
│   └── package.json
└── README.md
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **Socket.io** - Comunicación en tiempo real
- **Multer** - Subida de archivos
- **Bcrypt** - Encriptación de contraseñas
- **Nodemailer** - Envío de emails

### Frontend Web
- **React** - Biblioteca de UI
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **Context API** - Gestión de estado

### Mobile
- **React Native** - Framework mobile
- **NativeWind** - Tailwind para React Native
- **Expo** - Herramientas de desarrollo

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB (local o Atlas)
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone https://github.com/TU_USUARIO/SocialRoa.git
cd SocialRoa
```

### 2. Configurar el Backend
```bash
cd backend
npm install

# Crear archivo .env
echo "MONGODB_URI=mongodb://localhost:27017/socialroa" > .env
echo "JWT_SECRET=tu_jwt_secret_aqui" >> .env
echo "PORT=3001" >> .env
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
```

### 4. Configurar la App Mobile (Opcional)
```bash
cd ../SocialRoaMobile
npm install
```

## 🏃‍♂️ Ejecutar la Aplicación

### Backend
```bash
cd backend
npm start
# El servidor se ejecutará en http://localhost:3001
```

### Frontend Web
```bash
cd frontend
npm start
# La aplicación se ejecutará en http://localhost:3000
```

### App Mobile
```bash
cd SocialRoaMobile
npm start
# Seguir las instrucciones para Expo
```

## 📱 Uso del Script de Inicio Automático

Para Windows, usa el script batch incluido:
```bash
start.bat
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno (Backend)
```env
MONGODB_URI=mongodb://localhost:27017/socialroa
JWT_SECRET=tu_jwt_secret_muy_seguro
PORT=3001
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
```

### Proxy de Desarrollo (Frontend)
El frontend está configurado para hacer proxy a `http://localhost:3001` para las llamadas de API.

## 📊 Endpoints de API

### Autenticación
- `POST /api/auth/signup` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión

### Usuarios
- `GET /api/users/profile/:id` - Obtener perfil
- `PUT /api/users/profile` - Actualizar perfil

### Mensajes
- `GET /api/messages` - Obtener mensajes
- `POST /api/messages` - Enviar mensaje

### Historias
- `GET /api/stories` - Obtener historias
- `POST /api/stories` - Crear historia

### Transmisión en Vivo
- `GET /api/live` - Obtener transmisiones
- `POST /api/live` - Iniciar transmisión

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Contribución

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## � Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contacto

**Desarrollador**: Luis Marte  
**Email**: Roandy1017@gmail.com  
**Proyecto**: [https://github.com/TU_USUARIO/SocialRoa](https://github.com/TU_USUARIO/SocialRoa)

## 🎯 Roadmap

- [ ] Notificaciones push
- [ ] Sistema de likes y comentarios
- [ ] Grupos y comunidades
- [ ] Integración con redes sociales
- [ ] App de escritorio (Electron)
- [ ] Análiticas y métricas
- [ ] Moderación de contenido

## 📱 Capturas de Pantalla

### Web Application
![Home Page](screenshots/home.png)
![Profile Page](screenshots/profile.png)
![Messages](screenshots/messages.png)

### Mobile Application
![Mobile Home](screenshots/mobile-home.png)
![Mobile Profile](screenshots/mobile-profile.png)

---

⭐ **¡Dale una estrella al proyecto si te ha sido útil!** ⭐
- JWT para autenticación
- Multer para carga de archivos
- bcryptjs para encriptación
- Socket.IO para chat en tiempo real

### Frontend
- React 18
- React Router DOM
- Axios para API calls
- CSS personalizado con utilidades tipo Tailwind
- Context API para manejo de estado

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd SocialRoa
```

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend
```bash
cd ../frontend-new
npm install
```

### 4. Configurar variables de entorno
Crear un archivo `.env` en la carpeta `backend`:
```
NODE_ENV=development
PORT=3001
JWT_SECRET=tu-clave-secreta-aqui
```

## 🚀 Uso

### Opción 1: Usar el script de inicio (Windows)
```bash
# Desde la carpeta raíz del proyecto
start.bat
```

### Opción 2: Inicio manual

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend-new
npm start
```

## 🌐 URLs de Acceso

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Test:** http://localhost:3001/api

## 🔍 Estado Actual - TOTALMENTE REPARADO ✅

### Problemas Solucionados:
1. **✅ MongoDB Connection Error** - Implementado MongoDB Memory Server
2. **✅ Tailwind CSS PostCSS Error** - Reemplazado con CSS personalizado
3. **✅ ESLint Warnings** - Corregidos hooks y variables no utilizadas
4. **✅ Puerto 5000 en uso** - Cambiado a puerto 3001
5. **✅ Frontend compilation errors** - Solucionados problemas de dependencias
6. **✅ Scripts de inicio** - Actualizados para usar frontend-new

### Servidores Activos:
- **Backend:** ✅ Funcionando en puerto 3001 con MongoDB Memory Server
- **Frontend:** ✅ Funcionando en puerto 3000 con CSS personalizado

¡La aplicación está ahora completamente funcional! 🎉

## 📱 Funcionalidades Principales

### 1. Registro y Login
- Formularios de registro e inicio de sesión
- Validación de datos
- Gestión de errores

### 2. Perfil de Usuario
- Editar información personal
- Subir foto de perfil
- Ver seguidores y seguidos

### 3. Sistema de Mensajes
- Chat privado entre usuarios
- Mensajes en tiempo real
- Historial de conversaciones

### 4. Historias (Stories)
- Subir historias temporales
- Ver historias de otros usuarios
- Expiración automática en 24 horas

### 5. Transmisiones en Vivo
- Iniciar transmisiones
- Ver transmisiones de otros usuarios
- Chat en vivo

### 6. Carga de Medios
- Subir fotos y videos
- Galería de medios personal
- Previsualización de archivos

## 🛠️ Desarrollo

### Comandos Disponibles

**Backend:**
```bash
npm run dev      # Inicia el servidor en modo desarrollo
npm start        # Inicia el servidor en modo producción
```

**Frontend:**
```bash
npm start        # Inicia la aplicación React
npm run build    # Construye para producción
npm test         # Ejecuta las pruebas
```

### Base de Datos

La aplicación utiliza MongoDB Memory Server para desarrollo, que crea una base de datos temporal en memoria. Esto significa que:
- No necesitas instalar MongoDB localmente
- Los datos se reinician cada vez que reinicias el servidor
- Perfecto para desarrollo y pruebas

Para producción, simplemente cambia la configuración en `backend/src/config/database.js` para usar una base de datos MongoDB real.

## 🔍 Solución de Problemas

### Puerto ya en uso
Si encuentras errores de puerto en uso:
```bash
# Matar todos los procesos de Node.js
taskkill /F /IM node.exe

# Luego reiniciar los servidores
```

### Problemas de dependencias
```bash
# Limpiar node_modules e instalar de nuevo
rm -rf node_modules package-lock.json
npm install
```

### Problemas de CORS
El backend está configurado para aceptar requests desde `http://localhost:3000`. Si cambias el puerto del frontend, actualiza la configuración CORS en `backend/src/app.js`.

## 📈 Próximas Mejoras

- [ ] Notificaciones en tiempo real
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Optimización de imágenes
- [ ] Tests unitarios
- [ ] Dockerización
- [ ] Deployment en la nube

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

¡Gracias por usar SocialRoa! 🎉
