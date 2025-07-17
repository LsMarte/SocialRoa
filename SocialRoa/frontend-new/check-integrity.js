#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando integridad del código SocialRoa...\n');

// Archivos críticos a verificar
const criticalFiles = [
  'src/App.js',
  'src/index.js',
  'src/index.css',
  'src/context/AuthContext.js',
  'src/utils/api.js',
  'src/pages/Home.js',
  'src/pages/Profile.js',
  'src/pages/Messages.js',
  'src/pages/NotFound.js',
  'src/components/Auth/Login.js',
  'src/components/Auth/Register.js',
  'src/components/PrivateRoute.js',
  'src/components/Profile/UserProfile.js',
  'src/components/Messaging/Chat.js',
  'src/components/Media/Upload.js',
  'src/components/Live/LiveBroadcast.js',
  'src/components/Stories/StoryFeed.js',
  'package.json',
  'postcss.config.js',
  'tailwind.config.js'
];

let missingFiles = [];
let existingFiles = [];

// Verificar archivos
criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
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
  console.log(`\n🔧 Archivos que necesitan ser creados:`);
  missingFiles.forEach(file => console.log(`   - ${file}`));
}

console.log('\n✅ Verificación completada.');
