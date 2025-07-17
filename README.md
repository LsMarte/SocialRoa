# 🌟 SocialRoa - Complete Social Media Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green.svg)
![React Native](https://img.shields.io/badge/Mobile-React%20Native-blue.svg)

**SocialRoa** es una plataforma de redes sociales completa que incluye aplicación web, backend robusto y aplicación móvil. Desarrollada con tecnologías modernas para ofrecer una experiencia social completa.

## 🚀 Características Principales

### 🌐 **Aplicación Web (React)**
- **Autenticación segura** con JWT y validaciones avanzadas
- **Sistema de mensajería** en tiempo real
- **Transmisión en vivo** para broadcasting
- **Stories temporales** con multimedia
- **Perfiles de usuario** personalizables
- **Subida de medios** (imágenes, videos, documentos)
- **Interfaz responsiva** y moderna

### ⚡ **Backend (Node.js + Express)**
- **API RESTful** completa y documentada
- **Base de datos MongoDB** con Mongoose
- **Autenticación JWT** con middleware de seguridad
- **Rate limiting** y protección contra ataques
- **Subida de archivos** con multer
- **Websockets** para tiempo real
- **Validaciones robustas** con express-validator

### 📱 **Aplicación Móvil (React Native)**
- **Interfaz nativa** optimizada
- **Sincronización** con la aplicación web
- **NativeWind** para estilos consistentes
- **Componentes reutilizables**

## 📁 Estructura del Proyecto

```
SocialRoa/
├── 🌐 SocialRoa/frontend-new/     # Aplicación web principal (React)
├── ⚡ SocialRoa/backend/          # Servidor API (Node.js + Express)
├── 📱 SocialRoaMobile/            # App móvil (React Native)
├── 📋 Documentación/              # Guías y soluciones
└── 🔧 Scripts/                    # Scripts de inicio y testing
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca principal
- **React Router 5.3.4** - Navegación
- **Axios** - Cliente HTTP
- **CSS personalizado** - Estilos optimizados

### Backend
- **Node.js + Express** - Servidor web
- **MongoDB + Mongoose** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **multer** - Subida de archivos
- **express-validator** - Validaciones
- **helmet** - Seguridad
- **cors** - Cross-origin requests

### Mobile
- **React Native** - Framework móvil
- **NativeWind** - Sistema de estilos
- **Metro** - Bundler

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** (v14 o superior)
- **MongoDB** (local o Atlas)
- **npm** o **yarn**

### 1. Clonar el Repositorio
```bash
git clone https://github.com/LsMarte/SocialRoa.git
cd SocialRoa
```

### 2. Configurar Backend
```bash
cd SocialRoa/backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Iniciar servidor
npm start
# Servidor corriendo en http://localhost:3001
```

### 3. Configurar Frontend
```bash
cd SocialRoa/frontend-new
npm install

# Iniciar aplicación web
npm start
# Aplicación corriendo en http://localhost:3000
```

### 4. Configurar Mobile (Opcional)
```bash
cd SocialRoaMobile
npm install

# Para Android
npx react-native run-android

# Para iOS
npx react-native run-ios
```

## ⚡ Scripts Rápidos

### Iniciar Backend
```bash
# Desde la raíz del proyecto
./SocialRoa/start-backend-improved.bat
```

### Probar API
```bash
# Verificar que el backend funciona
./SocialRoa/test-api.bat
```

### Iniciar Frontend
```bash
cd SocialRoa/frontend-new
npm start
```

## 🔧 Problemas Resueltos

### ✅ **Errores PostCSS/Tailwind Corregidos**
- Eliminación completa de Tailwind CSS
- Configuración PostCSS simplificada
- CSS personalizado implementado

### ✅ **Sistema de Autenticación Optimizado**
- Problema de doble hash de contraseñas solucionado
- Verificación de email configurada
- JWT tokens funcionando correctamente

### ✅ **Compatibilidad React 19**
- Dependencias actualizadas
- Warnings de deprecación eliminados
- Funcionamiento estable

## 📋 Funcionalidades Implementadas

### 🔐 **Autenticación**
- [x] Registro de usuarios
- [x] Login seguro
- [x] JWT tokens
- [x] Protección de rutas
- [x] Rate limiting
- [x] Validaciones de seguridad

### 💬 **Mensajería**
- [x] Chat en tiempo real
- [x] Mensajes multimedia
- [x] Estado de lectura
- [x] Notificaciones

### 📸 **Multimedia**
- [x] Subida de imágenes
- [x] Subida de videos
- [x] Stories temporales
- [x] Galerías de medios

### 👥 **Social**
- [x] Perfiles de usuario
- [x] Sistema de amigos
- [x] Feed de publicaciones
- [x] Transmisiones en vivo

## 🚦 Estado del Proyecto

- ✅ **Frontend**: Completamente funcional
- ✅ **Backend**: API lista y testeada
- ✅ **Autenticación**: Sistema completo implementado
- ✅ **Base de datos**: Modelos y conexiones configuradas
- 🔄 **Mobile**: En desarrollo continuo
- 📝 **Documentación**: Completa y actualizada

## 🤝 Contribuir

1. **Fork** el repositorio
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**LsMarte** - [@LsMarte](https://github.com/LsMarte)

---

## 🔗 Enlaces Útiles

- [Documentación Completa](./SocialRoa/README.md)
- [Guía de Instalación](./SocialRoa/PROYECTO_COMPLETADO.md)
- [Solución de Problemas](./SocialRoa/SOLUCION_LOGIN_COMPLETA.md)
- [Errores Corregidos](./SocialRoa/frontend-new/ERRORES_DEFINITIVAMENTE_CORREGIDOS.md)

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐
