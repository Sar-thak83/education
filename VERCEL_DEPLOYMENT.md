# Vercel Deployment Guide - Study Notion ED Tech

## Architecture
- **Frontend**: React + Vite (deployed to `dist/`)
- **Backend**: Express.js (deployed as serverless functions in `/api`)
- **Database**: MongoDB (must be externally hosted and accessible)

## Step-by-Step Deployment

### 1. Prepare Your GitHub Repository
```bash
cd /Users/sarthak8385/Programming/Development/Study-Notion-ED-Tech
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### 2. Create Vercel Account
Go to https://vercel.com and sign up with GitHub

### 3. Deploy Project
1. Click **"New Project"**
2. Select your **GitHub repository**
3. Select **Root Directory**: `./` (root of project)
4. Click **Deploy**

### 4. Add Environment Variables
After initial deployment, go to **Settings → Environment Variables** and add:

#### Frontend Variables
```
VITE_BASE_URL=https://your-domain.vercel.app/api/v1
```

#### Backend Variables
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM_EMAIL=noreply@yourdomain.com

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

STUDY_NOTION_FRONTEND_SITE=https://your-domain.vercel.app
NODE_ENV=production
```

### 5. Redeploy After Adding Variables
After adding environment variables:
1. Go to **Deployments**
2. Click on the latest deployment
3. Click **Redeploy**

## Important Notes

### MongoDB Configuration
- Ensure your MongoDB Atlas connection string allows Vercel IP addresses
- Go to MongoDB Atlas → Network Access
- Add `0.0.0.0/0` (or specific Vercel IPs) to IP Whitelist

### Email Setup (Gmail)
If using Gmail:
1. Enable 2-Factor Authentication on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an App Password (16 characters)
4. Use this in `MAIL_PASS`

### CORS Configuration
CORS is automatically configured to allow requests from your Vercel domain.
Update `STUDY_NOTION_FRONTEND_SITE` with your actual domain.

### File Uploads
Temporary files are stored in `/tmp/` which is cleaned up automatically by Vercel.
Cloudinary is configured for permanent media storage.

## API Endpoints After Deployment
```
Frontend: https://your-domain.vercel.app
Backend: https://your-domain.vercel.app/api/v1
Health: https://your-domain.vercel.app/api/health
```

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all environment variables are set
- Verify package.json scripts

### API Calls Return 404
- Verify `VITE_BASE_URL` is set correctly
- Check that API routes are mounted in `/api/[[...path]].js`

### MongoDB Connection Error
- Check `MONGODB_URI` format
- Verify IP whitelist in MongoDB Atlas
- Test connection locally first

### Email Not Sending
- Verify Gmail App Password
- Check MAIL_USER and MAIL_PASS
- Ensure less secure apps are enabled (if not using App Password)

### Cloudinary Upload Error
- Verify Cloudinary credentials
- Check upload permissions in Cloudinary dashboard

## Local Development
```bash
npm install
npm start  # Runs both frontend and backend
```

## Testing API Before Deployment
```bash
curl https://your-domain.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2024-01-04T...",
  "service": "StudyNotion Backend"
}
```
