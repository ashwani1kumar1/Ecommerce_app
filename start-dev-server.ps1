# PowerShell script to start the Next.js dev server
Set-Location "c:\Users\ashwa\OneDrive\Pictures\Screenshots\ecommerce app\ecommerce"
Write-Host "Starting Next.js development server..." -ForegroundColor Green
Write-Host "The app will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
npm run dev
