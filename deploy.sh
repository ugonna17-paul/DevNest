#!/bin/bash

# Quick Deployment Script for DevNest

echo "🚀 Starting DevNest Deployment Process..."
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
  echo "📦 Initializing Git repository..."
  git init
  git add .
  git commit -m "Initial commit - DevNest v1.0"
  echo "✅ Git initialized"
else
  echo "✅ Git already initialized"
fi

echo ""
echo "📋 Pre-Deployment Checklist:"
echo ""
echo "1. MongoDB Atlas Network Access:"
echo "   - Add IP: 0.0.0.0/0 to allow connections from anywhere"
echo "   - Go to: https://cloud.mongodb.com/v2/YOUR_PROJECT/security/network/accessList"
echo ""
echo "2. Backend Deployment (Render.com):"
echo "   - Sign up: https://render.com"
echo "   - Create New Web Service"
echo "   - Connect GitHub repo"
echo "   - Root Directory: backend"
echo "   - Build: npm install"
echo "   - Start: node index.js"
echo "   - Add environment variables from backend/.env"
echo ""
echo "3. Frontend Deployment (Vercel):"
echo "   - Sign up: https://vercel.com"
echo "   - Import Project from GitHub"
echo "   - Root Directory: devnest"
echo "   - Framework: Vite"
echo "   - Add environment variable: VITE_API_URL=<your-render-backend-url>"
echo ""
echo "4. Update Frontend API URL:"
echo "   - After backend deploys, update devnest/.env.production"
echo "   - Set: VITE_API_URL=https://your-backend.onrender.com"
echo ""
echo "📚 Full instructions: See DEPLOYMENT_GUIDE.md"
echo ""
echo "Continue? (y/n)"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  echo ""
  echo "✅ Ready to deploy!"
  echo ""
  echo "Next steps:"
  echo "1. Push to GitHub"
  echo "2. Connect to Render.com for backend"
  echo "3. Connect to Vercel.com for frontend"
  echo ""
  echo "Would you like to push to GitHub now? (y/n)"
  read -r push_response
  
  if [[ "$push_response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "Enter your GitHub repository URL:"
    read -r repo_url
    
    git remote add origin "$repo_url" 2>/dev/null || git remote set-url origin "$repo_url"
    git branch -M main
    git add .
    git commit -m "Prepare for deployment" --allow-empty
    git push -u origin main
    
    echo "✅ Pushed to GitHub!"
    echo ""
    echo "Now go to:"
    echo "🔧 Backend: https://render.com (deploy from GitHub)"
    echo "🎨 Frontend: https://vercel.com (deploy from GitHub)"
  fi
else
  echo "Cancelled."
fi
