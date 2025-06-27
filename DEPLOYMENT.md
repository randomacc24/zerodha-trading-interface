# GitHub Deployment Guide

## Step-by-Step Instructions to Deploy on GitHub Pages

### Prerequisites
1. **GitHub Account**: Make sure you have a GitHub account
2. **Git**: Install Git from https://git-scm.com/
3. **Node.js**: Install Node.js from https://nodejs.org/

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `zerodha-trading-interface`
5. Make it **Public** (required for free GitHub Pages)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### Step 2: Update Homepage URL

1. Open `package.json` in your project
2. Replace `yourusername` in the homepage field with your actual GitHub username:
   ```json
   "homepage": "https://yourusername.github.io/zerodha-trading-interface"
   ```

### Step 3: Initialize Git and Push to GitHub

Open Command Prompt or PowerShell in your project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Zerodha Trading Interface"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/zerodha-trading-interface.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Install Dependencies and Deploy

```bash
# Install dependencies
npm install

# Deploy to GitHub Pages
npm run deploy
```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "gh-pages" branch
6. Click "Save"

### Step 6: Access Your Deployed Site

Your site will be available at:
```
https://yourusername.github.io/zerodha-trading-interface
```

## Troubleshooting

### If npm install fails:
- Make sure Node.js is installed
- Try running: `npm cache clean --force`
- Then run: `npm install`

### If git commands fail:
- Make sure Git is installed and in your PATH
- Try restarting your terminal/command prompt

### If deployment fails:
- Check that your repository is public
- Verify the homepage URL in package.json matches your GitHub username
- Make sure you have write access to the repository

### If the site doesn't load:
- Wait a few minutes for GitHub Pages to build
- Check the "Actions" tab in your repository for build status
- Verify the gh-pages branch was created

## Custom Domain (Optional)

To use a custom domain:

1. Go to repository Settings > Pages
2. Enter your custom domain in the "Custom domain" field
3. Click "Save"
4. Update your DNS settings to point to GitHub Pages
5. Update the homepage in package.json to your custom domain

## Automatic Deployment

To enable automatic deployment on every push:

1. Go to repository Settings > Pages
2. Under "Source", select "GitHub Actions"
3. This will create a workflow that builds and deploys automatically

## Security Notes

- Never commit API keys or secrets to GitHub
- Use environment variables for sensitive data
- Consider using GitHub Secrets for production deployments

## Support

If you encounter issues:
1. Check the GitHub Pages documentation
2. Look at the Actions tab for build errors
3. Verify all files are properly committed
4. Ensure the repository is public 