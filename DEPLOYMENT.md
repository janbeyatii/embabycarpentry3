# Vercel Deployment Guide

## Quick Fix for 404 Error

If you're getting a 404 error on Vercel, try these steps:

### 1. Check Build Logs
- Go to your Vercel dashboard
- Check the "Deployments" tab
- Look at the build logs to see if there are any errors

### 2. Common Issues and Solutions

#### Issue: Build Failing
- Make sure all dependencies are in `package.json`
- Check that Node.js version is compatible (Vercel uses Node 18+ by default)

#### Issue: TypeScript Errors
- Run `npm run build` locally to check for TypeScript errors
- Fix any type errors before deploying

#### Issue: Missing Files
- Ensure all files are committed to git
- Check that `.gitignore` isn't excluding important files

### 3. Vercel Settings

In your Vercel project settings:
- **Framework Preset**: Next.js (should auto-detect)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)
- **Node.js Version**: 18.x or 20.x

### 4. Environment Variables
If you have any environment variables, add them in Vercel dashboard:
- Settings → Environment Variables

### 5. Redeploy
After making changes:
1. Commit and push to your repository
2. Vercel will automatically redeploy
3. Or manually trigger a redeploy from the dashboard

## Local Testing

Before deploying, test locally:
```bash
npm install
npm run build
npm start
```

Then visit `http://localhost:3000` to ensure everything works.
