const { execSync } = require('child_process');

try {
  console.log('Testing Tailwind CSS configuration...');
  
  // Test if PostCSS can process the CSS
  const result = execSync('npx postcss src/index.css -o test-output.css', { 
    encoding: 'utf-8',
    cwd: __dirname
  });
  
  console.log('✅ PostCSS processing successful');
  console.log('Configuration appears to be working correctly');
  
  // Clean up
  const fs = require('fs');
  if (fs.existsSync('test-output.css')) {
    fs.unlinkSync('test-output.css');
  }
  
} catch (error) {
  console.error('❌ Error testing configuration:', error.message);
  process.exit(1);
}
