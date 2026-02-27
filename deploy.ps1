# Quick Deployment Script for DevNest (Windows PowerShell)

Write-Host "🚀 Starting DevNest Deployment Process..." -ForegroundColor Green
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
  Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
  git init
  git add .
  git commit -m "Initial commit - DevNest v1.0"
  Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
  Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Pre-Deployment Checklist:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. MongoDB Atlas Network Access:"
Write-Host "   - Add IP: 0.0.0.0/0 to allow connections from anywhere"
Write-Host "   - Go to: https://cloud.mongodb.com"
Write-Host ""
Write-Host "2. Backend Deployment (Render.com):"
Write-Host "   - Sign up: https://render.com"
Write-Host "   - Create New Web Service"
Write-Host "   - Connect GitHub repo"
Write-Host "   - Root Directory: backend"
Write-Host "   - Build: npm install"
Write-Host "   - Start: node index.js"
Write-Host "   - Add environment variables from backend/.env"
Write-Host ""
Write-Host "3. Frontend Deployment (Vercel):"
Write-Host "   - Sign up: https://vercel.com"
Write-Host "   - Import Project from GitHub"
Write-Host "   - Root Directory: devnest"
Write-Host "   - Framework: Vite"
Write-Host "   - Add: VITE_API_URL=<your-render-backend-url>"
Write-Host ""
Write-Host "📚 Full instructions: See DEPLOYMENT_GUIDE.md" -ForegroundColor Yellow
Write-Host ""

$response = Read-Host "Continue? (y/n)"

if ($response -eq 'y' -or $response -eq 'Y') {
  Write-Host ""
  Write-Host "✅ Ready to deploy!" -ForegroundColor Green
  Write-Host ""
  Write-Host "Next steps:"
  Write-Host "1. Push to GitHub"
  Write-Host "2. Connect to Render.com for backend"
  Write-Host "3. Connect to Vercel.com for frontend"
  Write-Host ""
  
  $push_response = Read-Host "Would you like to push to GitHub now? (y/n)"
  
  if ($push_response -eq 'y' -or $push_response -eq 'Y') {
    $repo_url = Read-Host "Enter your GitHub repository URL"
    
    try {
      git remote add origin $repo_url 2>$null
    } catch {
      git remote set-url origin $repo_url
    }
    
    git branch -M main
    git add .
    git commit -m "Prepare for deployment" --allow-empty
    git push -u origin main
    
    Write-Host "✅ Pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now go to:"
    Write-Host "🔧 Backend: https://render.com (deploy from GitHub)" -ForegroundColor Cyan
    Write-Host "🎨 Frontend: https://vercel.com (deploy from GitHub)" -ForegroundColor Cyan
  }
} else {
  Write-Host "Cancelled." -ForegroundColor Red
}
