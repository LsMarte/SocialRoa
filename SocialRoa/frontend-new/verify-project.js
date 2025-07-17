#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/App.js',
  'src/index.js',
  'src/index.css',
  'src/context/AuthContext.js',
  'src/components/PrivateRoute.js',
  'src/pages/Home.js',
  'src/pages/Profile.js',
  'src/pages/Messages.js',
  'src/pages/NotFound.js',
  'src/components/Auth/Login.js',
  'src/components/Auth/Register.js',
  'src/components/Profile/UserProfile.js',
  'src/components/Messaging/Chat.js',
  'src/components/Media/Upload.js',
  'src/components/Live/LiveBroadcast.js',
  'src/components/Stories/StoryFeed.js',
  'src/utils/api.js',
  'package.json',
  'postcss.config.js'
];

console.log('🔍 Verificando archivos de SocialRoa...\n');

const missingFiles = [];
const existingFiles = [];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    existingFiles.push(file);
    console.log(`✅ ${file}`);
  } else {
    missingFiles.push(file);
    console.log(`❌ ${file} - FALTA`);
  }
});

console.log(`\n📊 Resumen:`);
console.log(`✅ Archivos existentes: ${existingFiles.length}`);
console.log(`❌ Archivos faltantes: ${missingFiles.length}`);

if (missingFiles.length > 0) {
  console.log('\n🚨 Archivos que necesitan ser creados:');
  missingFiles.forEach(file => console.log(`   - ${file}`));
}

console.log('\n🔧 Verificando errores de sintaxis...');

// Verificar package.json
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('✅ package.json es válido');
} catch (error) {
  console.log('❌ package.json tiene errores:', error.message);
}

// Verificar postcss.config.js
try {
  require('./postcss.config.js');
  console.log('✅ postcss.config.js es válido');
} catch (error) {
  console.log('❌ postcss.config.js tiene errores:', error.message);
}

console.log('\n✅ Verificación completada');
