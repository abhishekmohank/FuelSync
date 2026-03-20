# Testing Guide

Complete guide for testing the FuelSync application.

## Manual Testing

### 1. Authentication Testing

#### Test: User Registration
```
Steps:
1. Go to http://localhost:3000/register
2. Fill in: Name, Email, Password, Confirm Password
3. Click "Sign Up"
4. Expected: Redirected to dashboard, token in localStorage
```

#### Test: User Login
```
Steps:
1. Go to http://localhost:3000/login
2. Enter registered email and password
3. Click "Login"
4. Expected: Redirected to dashboard with user data loaded
```

#### Test: Logout
```
Steps:
1. Click "Logout" in sidebar
2. Expected: Redirected to login page, token cleared from storage
```

---

### 2. Goals Testing

#### Test: View Default Goals
```
Steps:
1. Login to dashboard
2. Click "Goals" in sidebar
3. Expected: Default goals displayed (2000 cal, 150g protein, etc.)
```

#### Test: Update Goals
```
Steps:
1. Go to Goals page
2. Change values (e.g., 2200 calories, 160g protein)
3. Click "Update Goals"
4. Expected: Success message, values saved, reload shows updated values
```

#### Test: Goal Validation
```
Steps:
1. Go to Goals page
2. Try entering 100 calories (below minimum)
3. Expected: Error message "Minimum 500 kcal"
4. Try leaving field empty
5. Expected: Required field error
```

---

### 3. Food Tracking - Manual Entry

#### Test: Add Food Entry
```
Steps:
1. Go to Dashboard
2. Click "+ Add Food" button
3. Leave "Manual Entry" tab selected
4. Fill in: Food name, calories, protein, carbs, fat
5. Click "Add Food"
6. Expected: Modal closes, entry appears in "Today's Entries", totals update
```

#### Test: Form Validation
```
Steps:
1. Try adding food without name
2. Expected: Error message "Food name is required"
3. Try entering negative calories
4. Expected: Accept negative (or show error based on validation)
```

#### Test: Instant Stats Update
```
Steps:
1. Note current calories on dashboard
2. Add food entry (e.g., 500 calories)
3. Expected: Dashboard updates instantly, shows 500 more calories
```

---

### 4. Food Tracking - AI Detection

#### Test: Image Upload
```
Steps:
1. Click "+ Add Food"
2. Click "Upload Image" tab
3. Select food image
4. Wait for detection
5. Expected: Form auto-fills with detected food name and nutrition
```

#### Test: No API Key Error
```
Steps:
1. Remove/invalid OPENAI_API_KEY in .env
2. Try uploading image
3. Expected: Error message "Failed to analyze image"
```

#### Test: Image Format Support
```
Steps:
1. Try uploading JPG - Expected: Works
2. Try uploading PNG - Expected: Works
3. Try uploading non-image file - Expected: May work or error depending on browser
```

---

### 5. Dashboard Analytics

#### Test: Progress Bars
```
Steps:
1. Go to Dashboard
2. Add food with 1000 calories (of 2000 goal)
3. Expected: Calories bar 50% full
4. Add another 1200 calories
5. Expected: Bar exceeds 100%, shows red color (over goal)
```

#### Test: Smart Insights
```
Steps:
1. Add food entries
2. If protein is less than goal: "You need Xg more protein today"
3. If protein goal met: "Great job hitting your protein goal!"
4. If over calories: "You exceeded calorie goal"
```

#### Test: Today's Entries Display
```
Steps:
1. Add multiple food entries
2. Dashboard shows all entries in reverse chronological order
3. Each entry shows: Food name, calories, protein
```

---

### 6. Analytics Page

#### Test: Weekly Chart
```
Steps:
1. Go to Analytics
2. Click "Weekly" button
3. Expected: Line chart shows calorie trend for past 7 days
4. X-axis: dates, Y-axis: calories
```

#### Test: Monthly Chart
```
Steps:
1. Go to Analytics
2. Click "Monthly" button
3. Expected: Line chart shows calorie trend for past 30 days
```

#### Test: Chart Updates
```
Steps:
1. Add food entry
2. Go to Analytics
3. Expected: Charts update to include new data
```

---

### 7. Food Log Page

#### Test: Date Selection
```
Steps:
1. Go to Food Log
2. Select today's date
3. Expected: Shows today's entries
4. Select yesterday's date
5. Expected: Shows yesterday's entries (if any)
```

#### Test: Delete Entry
```
Steps:
1. Go to Food Log
2. Click "Delete" on any entry
3. Click "OK" on confirmation
4. Expected: Entry removed from log and totals update
```

#### Test: Entry Table
```
Steps:
1. Add multiple entries
2. Go to Food Log
3. Expected: Table shows: Food Name, Calories, Protein, Carbs, Fat
4. All values display correctly
```

---

### 8. Responsive Design

#### Test: Desktop View
```
Steps:
1. View on desktop browser (1920x1080)
2. Expected: Full sidebar visible, 2-column layout on dashboard
```

#### Test: Tablet View
```
Steps:
1. Resize browser to 768x1024
2. Expected: Responsive layout, sidebar collapses appropriately
```

#### Test: Mobile View
```
Steps:
1. Resize browser to 375x667 (iPhone size)
2. Expected: Mobile-friendly layout, touch-friendly buttons
```

---

### 9. Error Handling

#### Test: Network Error
```
Steps:
1. Stop backend server
2. Try adding food entry
3. Expected: Error message "Failed to add food"
```

#### Test: Invalid Token
```
Steps:
1. Login and get token
2. Manually modify token in localStorage
3. Refresh page or try action
4. Expected: Logged out, redirected to login
```

#### Test: Database Error
```
Steps:
1. Disconnect MongoDB
2. Try any action
3. Expected: Error message "Internal Server Error"
```

---

## API Testing with cURL

### Test Authentication

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "confirmPassword": "test123"
  }'

# Login
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }' | jq -r '.token')

echo "Token: $TOKEN"
```

### Test Goals

```bash
# Get goals
curl http://localhost:5000/api/user/goals \
  -H "Authorization: Bearer $TOKEN"

# Update goals
curl -X POST http://localhost:5000/api/user/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "calories": 2200,
    "protein": 160,
    "carbs": 250,
    "fat": 70
  }'
```

### Test Food Operations

```bash
# Add food
curl -X POST http://localhost:5000/api/food \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "foodName": "Chicken Breast",
    "calories": 165,
    "protein": 31,
    "carbs": 0,
    "fat": 3.6
  }'

# Get daily food
curl http://localhost:5000/api/food/daily \
  -H "Authorization: Bearer $TOKEN"

# Get weekly food
curl http://localhost:5000/api/food/weekly \
  -H "Authorization: Bearer $TOKEN"

# Get monthly food
curl http://localhost:5000/api/food/monthly \
  -H "Authorization: Bearer $TOKEN"
```

---

## Automated Testing (Future)

```
# Run Jest tests (to be implemented)
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests with Cypress (to be implemented)
npx cypress run
```

---

## Performance Testing

### Load Testing

```bash
# Using Apache Bench
ab -n 100 -c 10 http://localhost:5000/api/health

# Using wrk
wrk -t4 -c100 -d30s http://localhost:5000/api/health
```

### Metrics to Monitor

- Response time (should be < 500ms)
- Database query time
- Memory usage
- CPU usage
- API throughput (requests/second)

---

## Security Testing

### Test: SQL Injection
```
Endpoint: /auth/login
Payload: email: "admin' OR '1'='1"
Expected: Fails safely (uses Mongoose, not vulnerable)
```

### Test: XSS Prevention
```
Endpoint: Food entry
Payload: <script>alert('xss')</script>
Expected: Script displays as text, doesn't execute
```

### Test: CSRF Protection
```
Currently: No CSRF tokens (stateless JWT)
Should be: OK for API endpoints with proper CORS
```

### Test: Token Expiration
```
Current: No expiration set
Future: Implement token refresh mechanism
```

---

## Browser DevTools Testing

### Check Network Tab
```
1. Open DevTools (F12)
2. Go to Network tab
3. Perform action (add food)
4. Verify:
   - Request has Authorization header
   - Response status is 200/201
   - Response payload is correct JSON
```

### Check Console
```
1. Look for JavaScript errors
2. Check for API error logs
3. Verify no security warnings
```

### Check Application Tab
```
1. Open Application > Local Storage
2. Verify token is stored
3. Verify user data is stored
```

---

## Test Data Checklist

- [x] Users with different roles
- [x] Various food entries
- [x] Multiple days of data
- [x] Edge cases (0 calories, very high values)
- [ ] Large datasets (1000+ entries)
- [ ] Special characters in food names
- [ ] Very long food names

---

## Known Issues & Limitations

1. Image detection only works with GPT-4 Vision enabled account
2. Free tier MongoDB Atlas has limitations
3. Free tier Render may sleep after 15 minutes
4. Mobile image capture may need browser permission
5. No offline support

---

## Deployment Testing

### Before Going Live

- [ ] Test on production database
- [ ] Test with real OpenAI API account
- [ ] Load testing with concurrent users
- [ ] Database backup testing
- [ ] Error recovery procedures
- [ ] Security audit
- [ ] HTTPS certificate verification

---

## Regression Testing

After each update, test:
1. Authentication still works
2. Food entry creation
3. Analytics calculations
4. Goal updates
5. Data persistence
6. Performance metrics

---

## Test Results Template

```
Date: ____
Tester: ____
Version: ____

Feature: ____
Status: PASS / FAIL
Notes: ____

Issues Found:
- Issue 1
- Issue 2

---
```

---

**Testing Complete! 🧪**
