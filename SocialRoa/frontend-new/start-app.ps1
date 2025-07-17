#!/usr/bin/env pwsh
Write-Host "Starting SocialRoa Frontend..." -ForegroundColor Green
Write-Host ""

# Check if we're in the correct directory
$currentPath = Get-Location
Write-Host "Current directory: $currentPath" -ForegroundColor Yellow

# Check Node.js version
Write-Host "Node.js version:" -ForegroundColor Cyan
node --version

# Check npm version
Write-Host "npm version:" -ForegroundColor Cyan
npm --version

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Blue
npm install

Write-Host ""
Write-Host "Starting the application..." -ForegroundColor Green
Write-Host "The application will be available at http://localhost:3000" -ForegroundColor Magenta
Write-Host ""

npm start
