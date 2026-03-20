# Deployment Guide

This guide covers deploying the FuelSync application to production.

## Prerequisites

- GitHub account with the project repository
- Render.com account (for backend)
- Vercel.com account (for frontend)
- MongoDB Atlas account (for database)

## Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up and create a new cluster

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

3. **Create Database User:**
   - Go to Database Access
   - Create a new user with strong password
   - Remember username and password

## Step 2: Backend Deployment (Render)

### 1. Prepare Repository

```bash
cd diet-backend
# Ensure package.json is correct
# Ensure server.js is the entry point
```

### 2. Deploy on Render

1. Go to https://render.com
2. Sign up or log in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository:
   - Select GitHub account
   - Select the `diet` repository
   - Authorize Render

5. Configure the Web Service:
   - **Name:** `fuelsync-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Root Directory:** `diet-backend`
   - **Instance Type:** `Free` (or paid for better performance)

6. Add Environment Variables:
   Click "Add Secret File" and set:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fuelsync
   JWT_SECRET=your_super_secret_key_here_must_be_long
   OPENAI_API_KEY=sk-your-openai-api-key-here
   PORT=5000
   FRONTEND_URL=https://your-frontend-url.vercel.app
   NODE_ENV=production
   ```

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Get your backend URL from Render dashboard (e.g., `https://fuelsync-backend.onrender.com`)

### 3. Keep Backend Alive

Free Render instances sleep after 15 minutes of inactivity.

**Option 1: Use a Ping Service**
- Go to https://uptimerobot.com
- Set up free monitoring to ping your backend every 5 minutes

**Option 2: Upgrade to Paid**
- Upgrade to a paid instance on Render

## Step 3: Frontend Deployment (Vercel)

### 1. Prepare Repository

Ensure `.gitignore` doesn't exclude necessary files:
```
node_modules/
.next
.env
.env.local
```

### 2. Deploy on Vercel

1. Go to https://vercel.com
2. Sign up or log in with GitHub
3. Click "New Project"
4. Import your GitHub repository:
   - Select the `diet` repository
   - Vercel will auto-detect Next.js

5. Configure Project:
   - **Project Name:** `fuelsync`
   - **Root Directory:** `diet-frontend`
   - **Framework Preset:** `Next.js`

6. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   NEXT_PUBLIC_APP_NAME=FuelSync
   ```

7. Click "Deploy"
8. Wait for deployment (2-3 minutes)
9. Get your frontend URL from Vercel (e.g., `https://fuelsync.vercel.app`)

### 3. Update Backend FRONTEND_URL

1. Go to Render dashboard
2. Click on your backend service
3. Go to "Environment"
4. Update `FRONTEND_URL` with your Vercel URL
5. Click "Save Changes" (auto-redeploys)

## Step 4: Configure Custom Domain (Optional)

### Backend Custom Domain

1. On Render:
   - Go to your service settings
   - Click "Custom Domain"
   - Add your domain (e.g., `api.yourdomain.com`)
   - Follow DNS instructions

### Frontend Custom Domain

1. On Vercel:
   - Go to project settings → Domains
   - Add your domain (e.g., `yourdomain.com`)
   - Follow DNS instructions

## Step 5: Post-Deployment Testing

1. **Test Frontend:**
   - Open your Vercel URL
   - Sign up with test account
   - Add food entry
   - Check analytics

2. **Test Backend API:**
   ```bash
   # Health check
   curl https://your-backend.onrender.com/api/health

   # Test login
   curl -X POST https://your-backend.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Test Database:**
   - Log in and add food entry
   - Check MongoDB Atlas to see data

4. **Test OpenAI Integration:**
   - Upload food image
   - Verify AI detection works

## Step 6: Monitoring

### Set Up Alerts

**Render:**
- Go to Settings → Alert Settings
- Enable email notifications for failures

**Vercel:**
- Go to Settings → Analytics
- Monitor build and deployment logs

**Uptime Monitoring:**
- Use UptimeRobot for health checks
- Receive alerts if service goes down

## Step 7: Scaling (Future)

When you need to scale:

1. **Backend:**
   - Upgrade Render plan from Free → Standard
   - Increase resource allocation

2. **Database:**
   - Upgrade MongoDB Atlas cluster
   - Add read replicas

3. **Frontend:**
   - Vercel handles auto-scaling
   - Consider upgrading to Pro for better performance

## Troubleshooting Deployment

### Backend won't start on Render
- Check build logs on Render dashboard
- Verify all dependencies in `package.json`
- Ensure `server.js` exports correctly

### Frontend won't deploy on Vercel
- Check build logs
- Ensure TypeScript compiles
- Verify all environment variables are set

### API connection issues
- Check CORS settings match frontend URL
- Verify `FRONTEND_URL` is exactly correct (no trailing slash)
- Test API directly with curl

### Database connection fails
- Verify MongoDB URI is correct
- Check IP is whitelisted in MongoDB Atlas
- Ensure database user has correct password

### 502 Bad Gateway
- Backend service may be sleeping (free Render)
- Check backend logs on Render
- Restart service

## Cost Estimation

### Monthly Costs

**Free Tier Option:**
- MongoDB Atlas: Free (512MB)
- Render Backend: Free (sleeps after 15 min)
- Vercel Frontend: Free
- **Total: $0** (with limitations)

**Budget Option:**
- MongoDB Atlas: $57/month (M2 cluster)
- Render Backend: $19/month (Standard)
- Vercel Frontend: Free
- **Total: ~$76/month**

**Production Option:**
- MongoDB Atlas: $200+/month (production cluster)
- Render Backend: $50+/month (dedicated)
- Vercel Frontend: $20+/month (Pro)
- **Total: $270+/month**

## Maintenance Tasks

### Weekly
- Monitor error logs
- Check database performance

### Monthly
- Review and update dependencies
- Check MongoDB backup

### Quarterly
- Test disaster recovery
- Review security settings

## Security Best Practices

1. **Secrets Management:**
   - Never commit `.env` files
   - Use Render/Vercel secret management
   - Rotate JWT_SECRET periodically

2. **HTTPS:**
   - Both Render and Vercel use HTTPS by default
   - No additional setup needed

3. **CORS:**
   - Only allow your frontend URL
   - Don't use wildcard (`*`) in production

4. **MongoDB:**
   - Use strong passwords
   - Whitelist IP addresses
   - Enable backups

5. **OpenAI API:**
   - Rotate API keys quarterly
   - Monitor usage
   - Set spending limits

## Useful Links

- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- UptimeRobot: https://uptimerobot.com

---

**Deployment Complete! 🎉**

Your application is now live and accessible to users worldwide.
