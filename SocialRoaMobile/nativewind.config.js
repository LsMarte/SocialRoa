// nativewind.config.js
module.exports = {
  plugins: [
    require('nativewind/plugin'),
  ],
  theme: {
    extend: {
      // Configuraciones específicas para NativeWind
      colors: {
        'social-primary': '#3b82f6',
        'social-secondary': '#64748b',
      }
    }
  }
};
