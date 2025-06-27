@echo off
echo ========================================
echo Zerodha Trading Interface Deployment
echo ========================================
echo.

echo Step 1: Installing dependencies...
npm install

echo.
echo Step 2: Building the application...
npm run build

echo.
echo Step 3: Deploying to GitHub Pages...
npm run deploy

echo.
echo ========================================
echo Deployment completed!
echo ========================================
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Go to Settings ^> Pages
echo 3. Select "Deploy from a branch"
echo 4. Choose "gh-pages" branch
echo 5. Click Save
echo.
echo Your site will be available at:
echo https://yourusername.github.io/zerodha-trading-interface
echo.
pause 