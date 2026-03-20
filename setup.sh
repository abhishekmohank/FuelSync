#!/bin/bash

# Diet Tracker - Full Stack Application Builder
# This script helps set up both backend and frontend

echo "🎯 Diet Tracker - Setup Script"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js 18+ from https://nodejs.org${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js version: $(node --version)"
echo ""

# Backend Setup
echo -e "${BLUE}Setting up Backend...${NC}"
cd diet-backend

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓${NC} Created .env file"
    echo -e "${YELLOW}⚠️  Please update .env with your credentials:${NC}"
    echo "   - MONGODB_URI"
    echo "   - OPENAI_API_KEY"
    echo "   - JWT_SECRET"
else
    echo -e "${GREEN}✓${NC} .env file exists"
fi

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${GREEN}✓${NC} Backend dependencies already installed"
fi

cd ..
echo ""

# Frontend Setup
echo -e "${BLUE}Setting up Frontend...${NC}"
cd diet-frontend

if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✓${NC} Created .env.local file"
else
    echo -e "${GREEN}✓${NC} .env.local file exists"
fi

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${GREEN}✓${NC} Frontend dependencies already installed"
fi

cd ..
echo ""

# Summary
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo "1. Backend Setup:"
echo "   cd diet-backend"
echo "   Update .env with your credentials"
echo "   npm run dev"
echo ""
echo "2. Frontend Setup (in another terminal):"
echo "   cd diet-frontend"
echo "   npm run dev"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo -e "${YELLOW}Documentation:${NC}"
echo "   - README.md          - Full documentation"
echo "   - QUICKSTART.md      - Quick start guide"
echo "   - DEPLOYMENT.md      - Deployment instructions"
echo "   - ARCHITECTURE.md    - System architecture"
echo ""
