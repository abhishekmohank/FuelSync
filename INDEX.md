# 📚 Project Documentation Index

## Quick Navigation

### Getting Started (Start Here!)
- **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup guide (⭐ READ THIS FIRST)
- **[README.md](./README.md)** - Complete project documentation

### Development
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design and data flow
- **[API.md](./API.md)** - Complete API endpoint reference
- **[TESTING.md](./TESTING.md)** - Testing procedures and checklist

### Deployment
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide

### Project Structure

```
diet/
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md                # Quick start (⭐ START HERE)
├── 📄 ARCHITECTURE.md              # System architecture
├── 📄 API.md                       # API documentation
├── 📄 TESTING.md                   # Testing guide
├── 📄 DEPLOYMENT.md                # Deployment instructions
├── 🔧 setup.sh                     # Linux/Mac setup script
├── 🔧 setup.bat                    # Windows setup script
├── 📋 .editorconfig                # Editor configuration
│
├── 📂 diet-backend/                # Express.js Backend
│   ├── 📂 config/                  # Configuration files
│   ├── 📂 models/                  # MongoDB schemas
│   ├── 📂 controllers/             # Business logic
│   ├── 📂 routes/                  # API endpoints
│   ├── 📂 middleware/              # Auth & validation
│   ├── 📂 utils/                   # Helper functions
│   ├── 📄 server.js                # Express app entry
│   ├── 📄 package.json             # Backend dependencies
│   ├── 📄 .env.example             # Environment template
│   └── 📄 .gitignore
│
└── 📂 diet-frontend/               # Next.js Frontend
    ├── 📂 app/                     # Next.js App Router
    │   ├── 📂 dashboard/           # Dashboard page
    │   ├── 📂 food-log/            # Food log page
    │   ├── 📂 analytics/           # Analytics page
    │   ├── 📂 goals/               # Goals page
    │   ├── 📄 page.tsx             # Home page
    │   ├── 📄 layout.tsx           # Root layout
    │   └── 📄 globals.css          # Global styles
    ├── 📂 components/              # Reusable components
    ├── 📂 utils/                   # API client & state
    ├── 📄 package.json             # Frontend dependencies
    ├── 📄 tsconfig.json            # TypeScript config
    ├── 📄 tailwind.config.js       # Tailwind config
    ├── 📄 .env.example             # Environment template
    └── 📄 .gitignore
```

## 🚀 Getting Started Path

### Path 1: First Time Setup (Recommended)
1. Read [QUICKSTART.md](./QUICKSTART.md) (5 min)
2. Run setup script (`setup.sh` or `setup.bat`)
3. Follow terminal instructions
4. Open http://localhost:3000

### Path 2: Manual Setup
1. Read [QUICKSTART.md](./QUICKSTART.md)
2. Backend: `cd diet-backend && npm install && npm run dev`
3. Frontend: `cd diet-frontend && npm install && npm run dev`
4. Open http://localhost:3000

### Path 3: Deployment
1. Read [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Set up MongoDB Atlas
3. Deploy backend to Render
4. Deploy frontend to Vercel

## 📖 Documentation Guide

| Document | Purpose | Read Time | When to Use |
|----------|---------|-----------|------------|
| QUICKSTART.md | Get running in 5 minutes | 5 min | First time setup |
| README.md | Complete feature overview | 15 min | Understand project |
| ARCHITECTURE.md | System design details | 10 min | Before developing |
| API.md | Endpoint reference | 20 min | API integration |
| TESTING.md | Test procedures | 15 min | QA/testing |
| DEPLOYMENT.md | Production setup | 20 min | Before deploying |

## 🎯 Common Tasks

### I want to...

**Run the application locally**
→ Read [QUICKSTART.md](./QUICKSTART.md)

**Understand how it works**
→ Read [ARCHITECTURE.md](./ARCHITECTURE.md)

**Call an API endpoint**
→ Read [API.md](./API.md)

**Test a feature**
→ Read [TESTING.md](./TESTING.md)

**Deploy to production**
→ Read [DEPLOYMENT.md](./DEPLOYMENT.md)

**Add a new feature**
→ Read [ARCHITECTURE.md](./ARCHITECTURE.md), then modify code

**Debug an issue**
→ Check [QUICKSTART.md](./QUICKSTART.md) troubleshooting section

**Use AI food detection**
→ See API.md POST /food/detect section

## 📚 Feature Documentation

### Authentication
- Endpoint: [API.md - Auth Endpoints](./API.md#authentication-endpoints)
- Testing: [TESTING.md - Authentication Testing](./TESTING.md#1-authentication-testing)
- Architecture: [ARCHITECTURE.md - Login Flow](./ARCHITECTURE.md#1-login-flow)

### Food Tracking
- Manual Entry: [API.md - Add Food Entry](./API.md#add-food-entry)
- AI Detection: [API.md - Detect Food from Image](./API.md#detect-food-from-image)
- Testing: [TESTING.md - Food Tracking](./TESTING.md#3-food-tracking---manual-entry)

### Goals Management
- API: [API.md - User Goals Endpoints](./API.md#user-goals-endpoints)
- Testing: [TESTING.md - Goals Testing](./TESTING.md#2-goals-testing)

### Analytics
- API: [API.md - Get Weekly/Monthly](./API.md#get-weekly-food-entries)
- Testing: [TESTING.md - Analytics Page](./TESTING.md#6-analytics-page)

## 🛠️ Tech Stack Reference

**Backend**
- Express.js - [expressjs.com](https://expressjs.com/)
- MongoDB - [docs.mongodb.com](https://docs.mongodb.com/)
- JWT - [jwt.io](https://jwt.io/)
- OpenAI API - [platform.openai.com/docs](https://platform.openai.com/docs)

**Frontend**
- Next.js - [nextjs.org/docs](https://nextjs.org/docs)
- React - [react.dev](https://react.dev/)
- TypeScript - [typescriptlang.org](https://www.typescriptlang.org/)
- Tailwind CSS - [tailwindcss.com](https://tailwindcss.com/)
- Recharts - [recharts.org](http://recharts.org/)

## 📋 Checklist for Developers

### Before Starting Coding
- [ ] Read QUICKSTART.md
- [ ] Set up local environment
- [ ] Understand ARCHITECTURE.md
- [ ] Read API.md for relevant endpoints
- [ ] Test that existing features work

### When Adding a Feature
- [ ] Update ARCHITECTURE.md if needed
- [ ] Add to API.md if adding endpoints
- [ ] Add test cases to TESTING.md
- [ ] Test manually following TESTING.md
- [ ] Test on responsive design
- [ ] Handle errors gracefully

### Before Deploying
- [ ] Follow DEPLOYMENT.md
- [ ] Run full test suite (TESTING.md)
- [ ] Test on production clone
- [ ] Set up monitoring
- [ ] Have rollback plan

## 🔍 Troubleshooting

**Problem: Backend won't start**
→ See [QUICKSTART.md - Troubleshooting](./QUICKSTART.md#-common-issues)

**Problem: API calls failing**
→ See [API.md - Error Responses](./API.md#error-responses)

**Problem: Feature not working**
→ See [TESTING.md](./TESTING.md) for testing procedures

**Problem: Deployment failing**
→ See [DEPLOYMENT.md - Troubleshooting](./DEPLOYMENT.md#troubleshooting-deployment)

## 📞 Getting Help

1. Check relevant documentation above
2. Look in troubleshooting sections
3. Review error messages
4. Check browser/server logs
5. Search similar issues

## 🎓 Learning Resources

### Backend Development
- Express.js Tutorial: https://expressjs.com/en/starter/hello-world.html
- MongoDB Guide: https://docs.mongodb.com/manual/
- JWT Basics: https://jwt.io/introduction
- OpenAI API: https://platform.openai.com/docs/api-reference

### Frontend Development
- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev/
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Recharts Docs: http://recharts.org/

## 📅 Version History

- **v1.0.0** (January 2024) - Initial release
  - Authentication
  - Food tracking (manual + AI)
  - Goals management
  - Dashboard analytics
  - Responsive design

## 🤝 Contributing

To contribute:
1. Create a feature branch
2. Follow existing code structure
3. Update documentation
4. Add tests
5. Submit pull request

## 📝 License

This project is open source and available under the MIT License.

---

## Quick Reference

### Commands

**Backend**
```bash
cd diet-backend
npm install         # Install dependencies
npm run dev        # Start development server
npm start          # Start production server
```

**Frontend**
```bash
cd diet-frontend
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
```

### URLs

| Service | URL |
|---------|-----|
| Frontend Dev | http://localhost:3000 |
| Backend Dev API | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |
| MongoDB | Local or Atlas connection |

### Environment Variables

**Backend** (.env)
```
MONGODB_URI=
JWT_SECRET=
OPENAI_API_KEY=
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Frontend** (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Diet Tracker
```

---

**Last Updated:** January 2024
**Status:** Production Ready ✅

**For the fastest onboarding, start with [QUICKSTART.md](./QUICKSTART.md)** 🚀
