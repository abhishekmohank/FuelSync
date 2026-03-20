# API Documentation

Complete REST API documentation for the Diet Tracker backend.

## Base URL

- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-backend.onrender.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

HTTP Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication Endpoints

### Register User

Creates a new user account and returns JWT token.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Validation Rules:**
- Name: Required, string
- Email: Required, valid format, unique
- Password: Required, min 6 characters
- Confirm Password: Must match password

**Error Responses:**
- `400` - User already exists
- `400` - Passwords do not match
- `400` - Missing required fields

---

### Login User

Authenticates user and returns JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Email and password are required
- `401` - Invalid credentials

---

## User Goals Endpoints

### Get User Goals

Retrieves user's daily nutrition goals.

**Endpoint:** `GET /user/goals`

**Authentication:** Required ✅

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439010",
  "calories": 2000,
  "protein": 150,
  "carbs": 250,
  "fat": 65,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `401` - No token provided / Invalid token

---

### Update User Goals

Updates user's daily nutrition goals.

**Endpoint:** `POST /user/goals`

**Authentication:** Required ✅

**Request Body:**
```json
{
  "calories": 2200,
  "protein": 160,
  "carbs": 250,
  "fat": 70
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439010",
  "calories": 2200,
  "protein": 160,
  "carbs": 250,
  "fat": 70,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:30:00.000Z"
}
```

**Validation Rules:**
- Calories: Minimum 500
- Protein: Minimum 20g
- Carbs: Minimum 20g
- Fat: Minimum 10g

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized

---

## Food Tracking Endpoints

### Add Food Entry

Manually adds a food entry with nutritional information.

**Endpoint:** `POST /food`

**Authentication:** Required ✅

**Request Body:**
```json
{
  "foodName": "Grilled Chicken Breast",
  "calories": 165,
  "protein": 31,
  "carbs": 0,
  "fat": 3.6,
  "date": "2024-01-15"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439010",
  "foodName": "Grilled Chicken Breast",
  "calories": 165,
  "protein": 31,
  "carbs": 0,
  "fat": 3.6,
  "imageUrl": null,
  "detectedByAI": false,
  "date": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Validation Rules:**
- foodName: Required, string
- calories: Required, number ≥ 0
- protein: Required, number ≥ 0
- carbs: Required, number ≥ 0
- fat: Required, number ≥ 0
- date: Optional, ISO format (defaults to today)

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized

---

### Detect Food from Image

Uses OpenAI Vision API to detect food and nutritional values from image.

**Endpoint:** `POST /food/detect`

**Authentication:** Required ✅

**Request Body:**
```json
{
  "image": "base64_encoded_image_string",
  "date": "2024-01-15"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439010",
  "foodName": "Caesar Salad",
  "calories": 320,
  "protein": 25,
  "carbs": 15,
  "fat": 18,
  "imageUrl": null,
  "detectedByAI": true,
  "date": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Base64 Encoding (JavaScript):**
```javascript
const reader = new FileReader();
reader.onload = (event) => {
  const base64 = event.target.result.split(',')[1];
  // Send base64 to API
};
reader.readAsDataURL(imageFile);
```

**Error Responses:**
- `400` - Image is required
- `401` - Unauthorized
- `500` - AI detection failed / API error

---

### Get Daily Food Entries

Retrieves all food entries for a specific day.

**Endpoint:** `GET /food/daily`

**Authentication:** Required ✅

**Query Parameters:**
- `date` (optional): ISO date format (e.g., `2024-01-15`), defaults to today

**Example:**
```
GET /food/daily?date=2024-01-15
```

**Response (200):**
```json
{
  "entries": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439010",
      "foodName": "Grilled Chicken Breast",
      "calories": 165,
      "protein": 31,
      "carbs": 0,
      "fat": 3.6,
      "date": "2024-01-15T00:00:00.000Z",
      "detectedByAI": false
    }
  ],
  "totals": {
    "calories": 165,
    "protein": 31,
    "carbs": 0,
    "fat": 3.6
  },
  "date": "2024-01-15"
}
```

**Error Responses:**
- `401` - Unauthorized

---

### Get Weekly Food Entries

Retrieves all food entries for the week containing the specified date.

**Endpoint:** `GET /food/weekly`

**Authentication:** Required ✅

**Query Parameters:**
- `date` (optional): ISO date format (defaults to current week)

**Response (200):**
```json
{
  "entries": [ /* array of food entries */ ],
  "dailyTotals": {
    "2024-01-15": {
      "calories": 2000,
      "protein": 150,
      "carbs": 250,
      "fat": 65
    },
    "2024-01-16": {
      "calories": 1900,
      "protein": 145,
      "carbs": 240,
      "fat": 60
    }
  },
  "weekStart": "2024-01-15"
}
```

---

### Get Monthly Food Entries

Retrieves all food entries for the month containing the specified date.

**Endpoint:** `GET /food/monthly`

**Authentication:** Required ✅

**Query Parameters:**
- `date` (optional): ISO date format (defaults to current month)

**Response (200):**
```json
{
  "entries": [ /* array of food entries */ ],
  "dailyTotals": {
    "2024-01-01": { /* daily totals */ },
    "2024-01-02": { /* daily totals */ }
    // ... more days
  },
  "monthStart": "2024-01-01"
}
```

---

### Update Food Entry

Updates an existing food entry.

**Endpoint:** `PUT /food/:id`

**Authentication:** Required ✅

**URL Parameters:**
- `id` - Food entry ID

**Request Body:**
```json
{
  "foodName": "Grilled Chicken Breast (Updated)",
  "calories": 170,
  "protein": 32,
  "carbs": 1,
  "fat": 4
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439010",
  "foodName": "Grilled Chicken Breast (Updated)",
  "calories": 170,
  "protein": 32,
  "carbs": 1,
  "fat": 4,
  "date": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T11:30:00.000Z"
}
```

**Error Responses:**
- `404` - Food entry not found
- `401` - Unauthorized

---

### Delete Food Entry

Deletes a food entry.

**Endpoint:** `DELETE /food/:id`

**Authentication:** Required ✅

**URL Parameters:**
- `id` - Food entry ID

**Response (200):**
```json
{
  "message": "Food entry deleted successfully"
}
```

**Error Responses:**
- `404` - Food entry not found
- `401` - Unauthorized

---

## Testing Endpoints

### Health Check

Checks if the API is running.

**Endpoint:** `GET /health`

**Authentication:** Not required

**Response (200):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per user

---

## Pagination

Not yet implemented. For future versions with large datasets:
- Use `?page=1&limit=20` query parameters
- Return `total`, `page`, `pages` in response

---

## Webhook Support

Not yet implemented. Future feature for integrations.

---

## Example API Usage

### cURL Examples

**Register:**
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

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Add Food:**
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

**Get Daily Food:**
```bash
curl http://localhost:5000/api/food/daily \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## JavaScript/Axios Examples

See `diet-frontend/utils/api.ts` for complete client implementation.

```typescript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register
const response = await apiClient.post('/auth/register', {
  name: 'John',
  email: 'john@example.com',
  password: 'pass123',
  confirmPassword: 'pass123',
});

// Login
const response = await apiClient.post('/auth/login', {
  email: 'john@example.com',
  password: 'pass123',
});

// Add food
const response = await apiClient.post('/food', {
  foodName: 'Chicken',
  calories: 165,
  protein: 31,
  carbs: 0,
  fat: 3.6,
});

// Get daily food
const response = await apiClient.get('/food/daily');
```

---

## Versioning

Current API Version: **v1** (implied in URL path)

Future versions may use `/api/v2/...`

---

## Support

For API issues or questions:
1. Check this documentation
2. Review error messages
3. Check backend logs
4. Open GitHub issue with API response

---

**Last Updated:** January 2024
