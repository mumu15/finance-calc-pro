@echo off
title FinCalc Pro - Auto Deploy Setup
color 0A

echo.
echo ============================================
echo   FinCalc Pro - Automatic Deploy Script
echo ============================================
echo.

:: ---- STEP 1: Check Node.js ----
echo [1/6] Checking Node.js...
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ERROR: Node.js not found!
    echo  Please install it from: https://nodejs.org
    echo  Download the LTS version, install it, then run this script again.
    echo.
    pause
    start https://nodejs.org
    exit /b
)
echo  Node.js found!

:: ---- STEP 2: Install dependencies ----
echo.
echo [2/6] Installing dependencies (this takes ~1 minute)...
call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo  ERROR: npm install failed. Check your internet connection.
    pause
    exit /b
)
echo  Dependencies installed!

:: ---- STEP 3: Test build ----
echo.
echo [3/6] Testing build...
call npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo  ERROR: Build failed. Please contact support.
    pause
    exit /b
)
echo  Build successful!

:: ---- STEP 4: Git setup ----
echo.
echo [4/6] Setting up Git...
git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo  ERROR: Git not found!
    echo  Please install it from: https://git-scm.com/download/win
    echo  Install with default settings, then run this script again.
    echo.
    pause
    start https://git-scm.com/download/win
    exit /b
)

git init
git add .
git commit -m "Initial commit - FinCalc Pro Finance Calculator Website"
echo  Git repo initialized!

:: ---- STEP 5: GitHub push ----
echo.
echo [5/6] Pushing to GitHub...
echo.
echo  INSTRUCTIONS:
echo  1. Go to github.com and sign in (or create a free account)
echo  2. Click the + button top right, then "New repository"
echo  3. Name it: finance-calc-pro
echo  4. Leave it PUBLIC, do NOT initialize with README
echo  5. Click "Create repository"
echo  6. Come back here and enter your GitHub username below
echo.
set /p GITHUB_USER="Enter your GitHub username: "
echo.
git remote add origin https://github.com/%GITHUB_USER%/finance-calc-pro.git
git branch -M main
echo  Pushing to GitHub... (a browser login window may open)
git push -u origin main
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo  Push failed. Make sure you:
    echo  1. Created the repo on GitHub first
    echo  2. The repo is named exactly: finance-calc-pro
    echo  3. You are logged into GitHub in your browser
    echo.
    pause
    exit /b
)
echo  Code pushed to GitHub!

:: ---- STEP 6: Open Vercel ----
echo.
echo [6/6] Opening Vercel for deployment...
echo.
echo ============================================
echo   FINAL STEP - Deploy on Vercel (FREE):
echo ============================================
echo.
echo  1. Sign up at vercel.com with your GitHub account
echo  2. Click "Add New Project"
echo  3. Import your "finance-calc-pro" repository
echo  4. Click DEPLOY - thats it! Live in 2 minutes.
echo.
echo  Opening Vercel now...
timeout /t 3 >nul
start https://vercel.com/new

echo.
echo ============================================
echo   SUCCESS! Your site will be live soon!
echo ============================================
echo.
echo  After Vercel deploys, apply for Google AdSense:
echo  https://adsense.google.com
echo.
echo  Then come back to this chat and share your
echo  AdSense Publisher ID and we will connect it!
echo.
pause
