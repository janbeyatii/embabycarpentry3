# Vercel Deployment Guide

## Quick Fix for 404 Error

Since your build works locally (`npm run build` succeeds), the 404 on Vercel is likely a configuration issue. Try these steps in order:

### Step 1: Verify Vercel Project Settings
1. Go to Vercel Dashboard → Your Project → Settings
2. Under **General** → **Framework Preset**: Should be **Next.js** (auto-detected)
3. Under **Build & Development Settings**:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: Leave empty (Next.js handles this)
   - **Install Command**: `npm install` (or leave default)
   - **Node.js Version**: 18.x or 20.x

### Step 2: Clear Vercel Cache and Redeploy
1. In Vercel Dashboard → Your Project → Deployments
2. Click the three dots (⋯) on the latest deployment
3. Select **Redeploy** → Check **"Use existing Build Cache"** to **OFF**
4. Click **Redeploy**

### Step 3: Check Build Logs
1. Go to the deployment that's showing 404
2. Click on it to view details
3. Check the **Build Logs** tab:
   - Look for any errors or warnings
   - Verify it says "Build Completed" (not failed)
   - Check if it says "Framework Detected: Next.js"

### Step 4: Verify Files Are Committed
Make sure these files are committed to git:
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tsconfig.json`
- ✅ `vercel.json`
- ✅ `app/` directory (all files)
- ✅ `public/` directory (all files)
- ✅ `next-env.d.ts` (should be committed)

Run: `git status` to see uncommitted files

### Step 5: Manual Framework Selection (if auto-detect fails)
If Vercel still doesn't detect Next.js:
1. Go to Project Settings → General
2. Under **Framework Preset**, manually select **Next.js**
3. Save and redeploy

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
