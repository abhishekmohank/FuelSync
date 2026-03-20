# Quick Start Guide

Get the Diet Tracker application running locally in minutes!

## 🚀 5-Minute Setup

### Step 1: Install Required Software
- Node.js 18+ from https://nodejs.org
- Git from https://git-scm.com
- MongoDB (local or create free account at https://mongodb.com/cloud/atlas)

### Step 2: Clone and Navigate
```bash
cd path/to/diet
```

### Step 3: Backend Setup (Terminal 1)

```bash
cd diet-backend

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# MONGODB_URI=your-mongodb-connection-string
# OPENAI_API_KEY=your-openai-api-key
# JWT_SECRET=any-random-string-for-testing

# Install and run
npm install
npm run dev
```

**Backend running at:** `http://localhost:5000`

### Step 4: Frontend Setup (Terminal 2)

```bash
cd diet-frontend

# Copy environment template
cp .env.example .env.local

# env.local already has correct values for local development

# Install and run
npm install
npm run dev
```

**Frontend running at:** `http://localhost:3000`

### Step 5: Access Application

1. Open browser: `http://localhost:3000`
2. Click "Sign Up"
3. Create account
4. Set your goals
5. Start tracking!

## 📋 Testing Checklist

- [ ] Can sign up with new account
- [ ] Can log in with credentials
- [ ] Can set daily goals
- [ ] Can manually add food
- [ ] Can view today's progress
- [ ] Can view analytics charts
- [ ] Can delete food entries
- [ ] Can log out

## 🔧 Configuration Files

### Backend `.env`
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/diet_tracker
JWT_SECRET=any_secret_key_for_testing
OPENAI_API_KEY=sk-...
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Diet Tracker
```

## 🎯 Key Features to Try

1. **Manual Food Entry**
   - Dashboard → Add Food → Manual Entry
   - Enter food details and submit

2. **AI Food Detection**
   - Add Food → Upload Image tab
   - Upload food photo
   - Auto-fills nutritional values

3. **Analytics**
   - Click "Analytics" in sidebar
   - View weekly/monthly trends
   - See calorie and protein charts

4. **Goals Management**
   - Click "Goals" in sidebar
   - Update daily nutrition targets
   - Save changes

5. **Food History**
   - Click "Food Log" in sidebar
   - Select different dates
   - View/delete past entries

## 📚 Database Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB Community
# Start MongoDB:
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Sign up at https://mongodb.com/cloud/atlas
2. Create new project
3. Create cluster (free tier available)
4. Get connection string
5. Add to `.env` as MONGODB_URI

## 🤖 OpenAI Setup

1. Create account at https://openai.com
2. Go to API keys: https://platform.openai.com/account/api-keys
3. Create new secret key
4. Add to `.env` as OPENAI_API_KEY

**Note:** Image detection requires GPT-4 Vision access. Free trial accounts may not have this enabled.

## 🐛 Common Issues

### "Cannot connect to MongoDB"
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure database exists in MongoDB Atlas (auto-created on first insert)

### "Backend connection refused"
- Is backend running on port 5000?
- Run: `npm run dev` in `diet-backend` folder

### "API authentication failed"
- Clear browser cache/storage
- Log out and log back in
- Check JWT_SECRET is same across sessions

### "Image detection not working"
- Verify OpenAI API key is correct
- Ensure account has GPT-4 Vision enabled
- Check image format is JPG/PNG

### "Tailwind styles not loading"
- Clear Next.js cache: `rm -rf .next`
- Reinstall: `npm install`
- Restart dev server

## 📝 Default Test Data

After registration, you get default goals:
- **Calories:** 2000 kcal
- **Protein:** 150g
- **Carbs:** 250g
- **Fat:** 65g

Update these in the Goals page.

## 🔐 Security Notes

For development only:
- JWT_SECRET can be anything (use longer string for production)
- Admin access: Direct database access
- No rate limiting (add in production)

## 🚀 Next Steps

1. Explore all features
2. Review code structure
3. Customize styling in `tailwind.config.js`
4. Modify database models as needed
5. Deploy to production following DEPLOYMENT.md

## 📖 File Structure Quick Reference

```
Backend Structure:
  models/         - Database schemas
  controllers/    - Business logic
  routes/         - API endpoints
  middleware/     - Auth & validation
  utils/          - Helper functions

Frontend Structure:
  app/            - Pages and routing
  components/     - React components
  utils/          - API client & state
```

## 💡 Tips

- Hot reload enabled for both backend and frontend during development
- Use browser DevTools to inspect API calls (Network tab)
- Check terminal for error messages
- Backend logs detailed request information
- Frontend console shows client-side errors

## 🆘 Getting Help

1. Check error messages in console
2. Review DEPLOYMENT.md for production issues
3. Check API responses in browser Network tab
4. Verify all environment variables are set
5. Ensure all dependencies are installed

## ⏭️ Ready to Deploy?

Follow [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production on Render (backend) and Vercel (frontend).

---

**You're all set! Start tracking your diet fitness goals! 💪**
