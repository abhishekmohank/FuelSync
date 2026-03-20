# FuelSync - AI-Powered Fitness & Diet Tracking Application

A full-stack web application for tracking fitness and diet goals with AI-powered food detection using OpenAI Vision API.

## 🎯 Features

### Authentication
- ✅ User signup/login/logout
- ✅ Secure JWT-based authentication
- ✅ Password hashing with bcryptjs

### User Goals
- ✅ Set daily goals for calories, protein, carbs, and fat
- ✅ Update goals anytime
- ✅ Default goals provided

### Food Tracking
- ✅ Manual food entry with nutritional information
- ✅ AI-powered food detection from images using OpenAI Vision API
- ✅ Auto-fill nutritional values from detected food
- ✅ View/edit/delete food entries

### Dashboard
- ✅ Real-time progress bars for calories and protein
- ✅ Smart insights and recommendations
- ✅ Quick-add food button
- ✅ Today's entries display

### Analytics
- ✅ Weekly and monthly summaries
- ✅ Line charts for calorie and protein trends
- ✅ Daily totals tracking
- ✅ Data visualization with Recharts

### History
- ✅ Calendar-based food log
- ✅ View/edit/delete past entries
- ✅ Date-wise filtering

### UI/UX
- ✅ Modern dashboard with cards
- ✅ Responsive mobile design
- ✅ Tailwind CSS styling
- ✅ Clean and intuitive interface
- ✅ Loading states and error handling

## 🛠️ Tech Stack

### Backend
- **Node.js & Express** - REST API server
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI food detection
- **CORS** - Cross-origin requests

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zustand** - State management
- **Axios** - HTTP client

## 📁 Project Structure

```
diet/
├── diet-backend/
│   ├── config/
│   │   └── database.js           # MongoDB configuration
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Goals.js             # Goals schema
│   │   └── FoodEntry.js         # Food entry schema
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── user.js              # User goal endpoints
│   │   └── food.js              # Food tracking endpoints
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── userController.js    # User logic
│   │   └── foodController.js    # Food logic
│   ├── middleware/
│   │   └── auth.js              # JWT middleware
│   ├── utils/
│   │   ├── tokenUtils.js        # Token generation
│   │   └── openaiUtils.js       # OpenAI integration
│   ├── server.js                # Express app setup
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment variables
│
└── diet-frontend/
    ├── app/
    │   ├── auth/
    │   │   ├── login/
    │   │   │   └── page.tsx      # Login page
    │   │   └── register/
    │   │       └── page.tsx      # Registration page
    │   ├── dashboard/
    │   │   └── page.tsx          # Main dashboard
    │   ├── food-log/
    │   │   └── page.tsx          # Food history
    │   ├── analytics/
    │   │   └── page.tsx          # Charts & analytics
    │   ├── goals/
    │   │   └── page.tsx          # Goal settings
    │   ├── layout.tsx            # Root layout
    │   └── globals.css           # Global styles
    ├── components/
    │   ├── ProgressBar.tsx       # Progress indicator
    │   ├── Insights.tsx          # Smart insights
    │   └── QuickAddFood.tsx      # Food add modal
    ├── utils/
    │   ├── api.ts                # API client
    │   └── store.ts              # Zustand store
    ├── package.json              # Frontend dependencies
    ├── tsconfig.json             # TypeScript config
    ├── tailwind.config.js        # Tailwind config
    ├── next.config.js            # Next.js config
    └── .env.example              # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- OpenAI API key

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd diet-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your credentials:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fuelsync
   JWT_SECRET=your_super_secret_key_here_min_32_chars
   OPENAI_API_KEY=sk-your-openai-api-key-here
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd diet-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file:**
   ```bash
   cp .env.example .env.local
   ```

4. **Update `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_APP_NAME=FuelSync
   ```

5. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

### Access the Application

1. Open `http://localhost:3000` in your browser
2. Sign up with a new account
3. Set your daily goals
4. Start tracking your food!

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Goals
- `GET /api/user/goals` - Get user's goals (requires auth)
- `POST /api/user/goals` - Update user's goals (requires auth)

### Food Tracking
- `POST /api/food` - Add food entry (requires auth)
- `POST /api/food/detect` - Detect food from image (requires auth)
- `GET /api/food/daily` - Get daily food entries (requires auth)
- `GET /api/food/weekly` - Get weekly food entries (requires auth)
- `GET /api/food/monthly` - Get monthly food entries (requires auth)
- `PUT /api/food/:id` - Update food entry (requires auth)
- `DELETE /api/food/:id` - Delete food entry (requires auth)

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=              # MongoDB connection string
JWT_SECRET=               # JWT secret for authentication
OPENAI_API_KEY=           # OpenAI API key for food detection
PORT=                     # Server port (default: 5000)
FRONTEND_URL=             # Frontend URL for CORS
NODE_ENV=                 # development/production
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=      # Backend API URL
NEXT_PUBLIC_APP_NAME=     # Application name
```

## 🚢 Deployment

### Deploy Backend on Render

1. **Push code to GitHub**
2. **Create account on Render.com**
3. **Create new Web Service:**
   - Connect GitHub repository
   - Select `diet-backend` directory
   - Set environment variables from `.env`
   - Set build command: `npm install`
   - Set start command: `node server.js`
   - Deploy

### Deploy Frontend on Vercel

1. **Push code to GitHub**
2. **Create account on Vercel.com**
3. **Import project:**
   - Select GitHub repository
   - Set project root to `diet-frontend`
   - Add environment variable `NEXT_PUBLIC_API_URL` pointing to your Render backend
   - Deploy

### Environment Setup for Production

**Backend (Render):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fuelsync
JWT_SECRET=your_secure_random_key_here
OPENAI_API_KEY=sk-your-openai-key
PORT=5000
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```

**Frontend (Vercel):**
```env
NEXT_PUBLIC_API_URL=https://your-render-app.onrender.com/api
```

## 📝 Example Usage

### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Add Food Entry
```bash
curl -X POST http://localhost:5000/api/food \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "foodName": "Chicken Breast",
    "calories": 165,
    "protein": 31,
    "carbs": 0,
    "fat": 3.6
  }'
```

### 4. Get Daily Food
```bash
curl http://localhost:5000/api/food/daily \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🤖 AI Food Detection

The app uses OpenAI's Vision API to detect food from images and estimate nutritional values.

### How it works:
1. User uploads an image of food
2. Image is converted to base64
3. Sent to OpenAI Vision API
4. API returns food name and estimated nutrition
5. Form is auto-filled with detected values

### Getting OpenAI API Key:
1. Visit https://platform.openai.com/account/api-keys
2. Create new API key
3. Add to `.env` file as `OPENAI_API_KEY`

## 🎨 Customization

### Tailwind CSS
Modify `diet-frontend/tailwind.config.js` to customize colors, fonts, and styling.

### Goals Defaults
Edit `diet-backend/controllers/userController.js` to change default goals value.

### Database Schema
Modify models in `diet-backend/models/` to add new fields.

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify `.env` variables
- Check port 5000 is not in use

### Frontend won't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running
- Check CORS settings in `server.js`

### OpenAI API errors
- Verify API key is correct
- Check API key has Vision API enabled
- Check account has credits

### JWT token errors
- Ensure `JWT_SECRET` matches between sessions
- Token may have expired
- Try logging in again

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🔄 Future Enhancements

- [ ] Dark mode toggle
- [ ] Streak tracking (consecutive days meeting goals)
- [ ] Loading skeletons
- [ ] Advanced filters and search
- [ ] Export data as PDF
- [ ] Mobile app with React Native
- [ ] Social sharing features
- [ ] Meal planning
- [ ] Barcode scanning
- [ ] Social features (friends, challenges)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy Tracking! 🎉**
