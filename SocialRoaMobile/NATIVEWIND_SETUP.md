# 🎯 NativeWind (Tailwind CSS) - Configuración para SocialRoaMobile

## ✅ Configuración Completada

### 📦 **Paquetes Instalados:**
```bash
npm install nativewind tailwindcss
```

### 🔧 **Archivos Configurados:**

#### 1. **tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### 2. **babel.config.js**
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
    ],
  };
};
```

#### 3. **metro.config.js**
```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for CSS files
config.resolver.sourceExts.push('css');

module.exports = config;
```

### 🚀 **Cómo Usar NativeWind:**

#### **Ejemplo de Componente:**
```javascript
import { View, Text, TouchableOpacity } from 'react-native';

const MyComponent = () => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-lg">
      <Text className="text-xl font-bold text-gray-800">
        ¡Hola NativeWind!
      </Text>
      <TouchableOpacity className="bg-indigo-600 p-3 rounded-lg mt-4">
        <Text className="text-white text-center font-semibold">
          Botón Estilizado
        </Text>
      </TouchableOpacity>
    </View>
  );
};
```

### 🎨 **Clases de Tailwind Disponibles:**

#### **Colores:**
- `bg-red-500`, `bg-blue-500`, `bg-green-500`
- `text-white`, `text-gray-800`, `text-indigo-600`

#### **Espaciado:**
- `p-4`, `px-6`, `py-3`, `m-4`, `mx-auto`
- `space-x-2`, `space-y-4`

#### **Flexbox:**
- `flex-1`, `flex-row`, `flex-col`
- `items-center`, `justify-center`, `justify-between`

#### **Texto:**
- `text-sm`, `text-lg`, `text-xl`, `text-2xl`
- `font-bold`, `font-semibold`, `text-center`

#### **Bordes:**
- `rounded-lg`, `rounded-full`, `border`, `border-2`
- `shadow-lg`, `shadow-md`

### 🔍 **Componentes Creados:**

#### **ProfileCard.js**
Componente de ejemplo que muestra:
- Avatar circular
- Información del usuario
- Estadísticas (posts, seguidores, siguiendo)
- Botón de seguir
- Uso completo de clases NativeWind

### 📱 **Ejecutar la Aplicación:**

```bash
# Desarrollo
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### 🛠️ **Diferencias con Tailwind CSS Web:**

#### **❌ No Compatible:**
- `@tailwind` directives (no se necesitan)
- Algunas clases específicas de web (`hover:`, `focus:`)
- Grid layouts (usa `flexbox` en su lugar)

#### **✅ Compatible:**
- Colores y espaciado
- Flexbox y positioning
- Texto y tipografía
- Bordes y sombras
- Width/Height básicos

### 🎯 **Mejores Prácticas:**

1. **Usa principalmente `flexbox`** para layouts
2. **Combina NativeWind con StyleSheet** cuando sea necesario
3. **Usa `className` para estilos básicos**
4. **Usa `style` para estilos dinámicos**

### 🔧 **Resolución de Problemas:**

#### **Si las clases no funcionan:**
1. Reinicia el servidor: `npm start`
2. Limpia caché: `expo start --clear`
3. Verifica que `babel.config.js` esté configurado correctamente

#### **Si hay errores de compilación:**
1. Verifica que `metro.config.js` esté presente
2. Asegúrate de que `tailwind.config.js` tenga las rutas correctas
3. Reinicia completamente el proyecto

### 🎉 **Estado Actual:**
- ✅ NativeWind instalado y configurado
- ✅ Tailwind CSS funcionando
- ✅ Componente ProfileCard de ejemplo
- ✅ App.js actualizado con ejemplos
- ✅ Configuración completa para desarrollo

### 📄 **Archivos Importantes:**
- `tailwind.config.js` - Configuración de Tailwind
- `babel.config.js` - Configuración de Babel
- `metro.config.js` - Configuración de Metro
- `src/components/ProfileCard.js` - Componente de ejemplo
- `App.js` - Aplicación principal con ejemplos
