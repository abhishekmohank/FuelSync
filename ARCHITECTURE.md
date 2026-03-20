# FuelSync - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Next.js Frontend (Vercel)                  │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  Pages: Dashboard, Analytics, Food Log, Goals      │ │  │
│  │  │  Components: ProgressBar, Insights, QuickAddFood   │ │  │
│  │  │  State: Zustand (Auth, UI)                         │ │  │
│  │  │  Styling: Tailwind CSS                             │ │  │
│  │  │  Charts: Recharts                                  │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  │  API Calls via Axios                │  │
│  │  │  (http://backend/api/...)           │  │
│  │  v                                      v  │
│  └──────────────────────────────────────────────────────────┘  │
│                          │                                      │
│                     JWT Token in                                │
│                  Authorization Header                           │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                  HTTPS / Internet
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        v                                     v
   REST API                          OpenAI Vision API
   (Render)                          (for food detection)
        │
┌───────┴────────────────────────────────────────────────┐
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │         Express.js Backend (Node.js)             │ │
│  │                                                   │ │
│  │  Routes:                                         │ │
│  │  ├─ /api/auth/register, /login                  │ │
│  │  ├─ /api/user/goals (get, update)              │ │
│  │  ├─ /api/food (CRUD operations)                │ │
│  │  ├─ /api/food/detect (AI detection)            │ │
│  │  ├─ /api/food/daily, weekly, monthly           │ │
│  │  └─ /api/health (health check)                 │ │
│  │                                                   │ │
│  │  Middleware:                                     │ │
│  │  ├─ CORS handling                               │ │
│  │  ├─ JWT authentication                          │ │
│  │  └─ Error handling                              │ │
│  │                                                   │ │
│  │  Controllers:                                    │ │
│  │  ├─ authController.js (register, login)        │ │
│  │  ├─ userController.js (goals management)       │ │
│  │  └─ foodController.js (food operations)        │ │
│  │                                                   │ │
│  │  Utils:                                          │ │
│  │  ├─ tokenUtils.js (JWT generation)             │ │
│  │  └─ openaiUtils.js (AI food detection)         │ │
│  │                                                   │ │
│  │  │                                              │ │
│  │  │  Database Queries                            │ │
│  │  v                                              │ │
│  └──────────────────────────────────────────────────┘ │
│                       │                                │
└───────────────────────┼────────────────────────────────┘
                        │
            MongoDB Atlas / Local MongoDB
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        v               v               v
    Users          Goals            FoodEntries
   Collection     Collection         Collection
   - _id           - _id              - _id
   - name          - userId           - userId
   - email         - calories         - foodName
   - password      - protein          - calories
   - createdAt     - carbs            - protein
   - updatedAt     - fat              - carbs
                   - updatedAt        - fat
                                      - date
                                      - imageUrl
                                      - detectedByAI
                                      - createdAt
```

## Data Flow

### 1. Login Flow
```
User Input
    ↓
Frontend Validation
    ↓
API Call: POST /auth/login
    ↓
Backend: Hash comparison + JWT generation
    ↓
Return: JWT Token + User Data
    ↓
Store: Token in localStorage + Zustand
    ↓
Redirect to Dashboard
```

### 2. Food Tracking Flow (Manual)
```
User Fills Form
    ↓
Frontend Validation
    ↓
API Call: POST /food
    ↓
Backend: Create FoodEntry
    ↓
MongoDB: Insert document
    ↓
Response: Confirmation
    ↓
Frontend: Update UI
```

### 3. AI Food Detection Flow
```
User Uploads Image
    ↓
Frontend: Convert to Base64
    ↓
API Call: POST /food/detect
    ↓
Backend: Parse Base64
    ↓
OpenAI Vision API: Analyze Image
    ↓
Extract: Food name + Nutrition
    ↓
Backend: Create FoodEntry
    ↓
MongoDB: Insert document
    ↓
Response: Auto-filled Form
    ↓
User: Review/Submit/Edit
```

### 4. Dashboard Analytics Flow
```
Page Load
    ↓
Parallel API Calls:
├─ GET /user/goals
├─ GET /food/daily
├─ GET /food/weekly
└─ GET /food/monthly
    ↓
Backend: Query MongoDB
    ↓
Calculate: Totals + Trends
    ↓
Response: JSON Data
    ↓
Frontend: Process Data
    ↓
Recharts: Render Charts
    ↓
Zustand: Update State
    ↓
Display: Dashboard UI
```

## Security

### Authentication
- JWT tokens stored in localStorage
- Token included in Authorization header
- Backend validates token on protected routes
- Auto-logout on invalid token

### Password Security
- Hashed with bcryptjs (10 salt rounds)
- Never sent back to frontend
- Compared server-side

### API Security
- CORS enabled for frontend origin only
- Proper error messages (no data leakage)
- Input validation on all endpoints
- Rate limiting (to be added)

### Data Privacy
- Users can only access their own data
- User ID validated on every request
- Database indexes on userId for security

## Performance Optimizations

### Frontend
- Next.js Code Splitting (auto)
- Lazy loading of components
- React Hook Form (lightweight)
- Zustand (minimal bundle)
- Tailwind CSS Purging

### Backend
- MongoDB Indexing (userId, date)
- Connection Pooling
- Efficient Queries
- Response Compression (via CORS)

### Database
- Created indexes on userId + date
- TTL indexes for old data (optional)
- Proper schema design

## Scaling Considerations

### Short Term (0-1000 users)
- Current setup sufficient
- Free tier MongoDB/Render
- Monitor response times

### Medium Term (1000-10k users)
- Upgrade to paid Render instance
- MongoDB cluster (M2+)
- Add Redis caching
- Implement rate limiting

### Long Term (10k+ users)
- Database replication
- CDN for static assets
- Load balancing
- Separate read/write databases
- Microservices architecture

## Technologies Justification

### Frontend: Next.js
- Server-side rendering capability
- Built-in API routes
- Excellent performance
- Great DX: hot reload, error messages

### Backend: Express.js
- Lightweight and flexible
- Large ecosystem
- Great for REST APIs
- Easy middleware system

### Database: MongoDB
- Schema flexibility
- JSON-like documents
- Easy scaling with Atlas
- Free tier available

### Authentication: JWT
- Stateless
- Scalable
- Mobile-friendly
- No session storage needed

### AI: OpenAI Vision
- Accurate food detection
- Latest model capabilities
- Easy to use API
- Pay-as-you-go pricing

## File Organization Rationale

### Backend Structure
- **models/** - Database schemas (Mongoose)
- **controllers/** - Business logic separate from routes
- **routes/** - Route definitions only
- **middleware/** - Reusable logic (auth, validation)
- **utils/** - Helper functions (tokens, AI)

Benefits:
- Clear separation of concerns
- Easy to test
- Scalable structure
- Reduced coupling

### Frontend Structure
- **app/** - Next.js pages (App Router)
- **components/** - Reusable React components
- **utils/** - API client and state management
- **context/** - Global state (Zustand)

Benefits:
- Follows Next.js conventions
- Easy to navigate
- Component-based architecture
- Zustand for minimal state

---

**This architecture is production-ready and scalable! 🚀**
