@echo off
echo ======================================================
echo    Starting Image Inflator - Local Development
echo ======================================================

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [1/2] node_modules not found. Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Error: npm install failed. Please make sure Node.js is installed.
        pause
        exit /b %errorlevel%
    )
) else (
    echo [1/2] Dependencies already installed.
)

echo [2/2] Starting development server...
echo The app will be available at http://localhost:3000

:: Small delay to give the server a head start before opening the browser
timeout /t 3 /nobreak > nul
start http://localhost:3000

:: Run the dev command
call npm run dev

pause
