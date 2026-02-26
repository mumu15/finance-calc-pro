#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

clear
echo ""
echo -e "${CYAN}${BOLD}============================================${NC}"
echo -e "${CYAN}${BOLD}   FinCalc Pro - Auto Deploy Script (Mac)  ${NC}"
echo -e "${CYAN}${BOLD}============================================${NC}"
echo ""

# ---- STEP 1: Check Node.js ----
echo -e "${YELLOW}[1/6] Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js not found!${NC}"
    echo ""
    echo "Please install Node.js from: https://nodejs.org"
    echo "Download the LTS version, install it, then run this script again."
    echo ""
    open "https://nodejs.org" 2>/dev/null || xdg-open "https://nodejs.org" 2>/dev/null
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version) found!${NC}"

# ---- STEP 2: Install dependencies ----
echo ""
echo -e "${YELLOW}[2/6] Installing dependencies (this takes ~1 minute)...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: npm install failed. Check your internet connection.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencies installed!${NC}"

# ---- STEP 3: Test build ----
echo ""
echo -e "${YELLOW}[3/6] Testing build...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Build failed.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build successful!${NC}"

# ---- STEP 4: Git setup ----
echo ""
echo -e "${YELLOW}[4/6] Setting up Git...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${RED}ERROR: Git not found! Install from https://git-scm.com${NC}"
    exit 1
fi
git init
git add .
git commit -m "Initial commit - FinCalc Pro Finance Calculator Website"
echo -e "${GREEN}✓ Git repo initialized!${NC}"

# ---- STEP 5: GitHub push ----
echo ""
echo -e "${YELLOW}[5/6] Pushing to GitHub...${NC}"
echo ""
echo -e "${BOLD}INSTRUCTIONS:${NC}"
echo "  1. Go to github.com and sign in (or create a free account)"
echo "  2. Click the + button top right → 'New repository'"
echo "  3. Name it: finance-calc-pro"
echo "  4. Leave it PUBLIC, do NOT initialize with README"
echo "  5. Click 'Create repository'"
echo "  6. Come back here and press ENTER"
echo ""
read -p "Enter your GitHub username: " GITHUB_USER
echo ""
git remote add origin "https://github.com/$GITHUB_USER/finance-calc-pro.git"
git branch -M main
echo "Pushing to GitHub... (a browser login window may open)"
git push -u origin main
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}Push failed. Make sure the repo exists on GitHub and is named 'finance-calc-pro'${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Code pushed to GitHub!${NC}"

# ---- STEP 6: Open Vercel ----
echo ""
echo -e "${YELLOW}[6/6] Opening Vercel for deployment...${NC}"
echo ""
echo -e "${CYAN}${BOLD}============================================${NC}"
echo -e "${CYAN}${BOLD}  FINAL STEP - Deploy on Vercel (FREE):   ${NC}"
echo -e "${CYAN}${BOLD}============================================${NC}"
echo ""
echo "  1. Sign up at vercel.com with your GitHub account"
echo "  2. Click 'Add New Project'"
echo "  3. Import your 'finance-calc-pro' repository"
echo "  4. Click DEPLOY — live in 2 minutes!"
echo ""
sleep 2
open "https://vercel.com/new" 2>/dev/null || xdg-open "https://vercel.com/new" 2>/dev/null

echo ""
echo -e "${GREEN}${BOLD}============================================${NC}"
echo -e "${GREEN}${BOLD}   SUCCESS! Your site will be live soon!   ${NC}"
echo -e "${GREEN}${BOLD}============================================${NC}"
echo ""
echo "After Vercel deploys, apply for Google AdSense:"
echo "→ https://adsense.google.com"
echo ""
echo "Then come back to this chat and share your AdSense"
echo "Publisher ID and we will connect it automatically!"
echo ""
