#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de Tailwind CSS...\n');

// Verificar archivos necesarios
const requiredFiles = [
  'tailwind.config.js',
  'postcss.config.js',
  'src/index.css',
  'package.json'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} existe`);
  } else {
    console.log(`❌ ${file} no existe`);
    allFilesExist = false;
  }
});

// Verificar dependencias en package.json
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  console.log('\n📦 Verificando dependencias:');
  
  const requiredDeps = {
    'tailwindcss': 'devDependencies',
    'autoprefixer': 'devDependencies',
    'postcss': 'devDependencies'
  };
  
  Object.entries(requiredDeps).forEach(([dep, section]) => {
    if (packageJson[section] && packageJson[section][dep]) {
      console.log(`✅ ${dep}: ${packageJson[section][dep]}`);
    } else {
      console.log(`❌ ${dep} no está instalado en ${section}`);
      allFilesExist = false;
    }
  });
}

// Verificar contenido del archivo CSS
const cssPath = path.join(__dirname, 'src/index.css');
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  console.log('\n🎨 Verificando archivo CSS:');
  
  const requiredDirectives = [
    '@tailwind base',
    '@tailwind components',
    '@tailwind utilities'
  ];
  
  requiredDirectives.forEach(directive => {
    if (cssContent.includes(directive)) {
      console.log(`✅ ${directive} encontrado`);
    } else {
      console.log(`❌ ${directive} no encontrado`);
      allFilesExist = false;
    }
  });
}

// Verificar configuración de Tailwind
const tailwindConfigPath = path.join(__dirname, 'tailwind.config.js');
if (fs.existsSync(tailwindConfigPath)) {
  console.log('\n⚙️  Verificando configuración de Tailwind:');
  const configContent = fs.readFileSync(tailwindConfigPath, 'utf8');
  
  if (configContent.includes('content:')) {
    console.log('✅ Configuración de content encontrada');
  } else {
    console.log('❌ Configuración de content no encontrada');
    allFilesExist = false;
  }
}

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('🎉 ¡Tailwind CSS está correctamente configurado!');
  console.log('💡 Puedes ejecutar npm start para verificar visualmente');
} else {
  console.log('⚠️  Hay problemas con la configuración de Tailwind CSS');
  console.log('🔧 Revisa los archivos marcados con ❌');
}

console.log('\n📝 Próximos pasos:');
console.log('1. Ejecuta: npm install');
console.log('2. Ejecuta: npm start');
console.log('3. Visita: http://localhost:3000');
console.log('4. Importa TailwindTest en tu App.js para probar');
