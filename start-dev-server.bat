@echo off
REM ===== Portfolio Development Server Starter =====
REM This script starts a local development server for hot-reload

echo.
echo ========================================
echo  Portfolio Development Server
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Python found! Starting server...
    echo.
    echo Server will run at: http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    pause
    exit /b
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Node.js found! Starting server...
    echo.
    echo First, checking for http-server...
    npm list -g http-server >nul 2>&1
    
    if %errorlevel% equ 0 (
        echo [✓] http-server is installed
        echo.
        echo Server will run at: http://localhost:8080
        echo.
        echo Press Ctrl+C to stop the server
        echo.
        http-server
        pause
        exit /b
    ) else (
        echo [!] http-server not found. Installing...
        npm install -g http-server
        echo.
        echo Server will run at: http://localhost:8080
        echo.
        echo Press Ctrl+C to stop the server
        echo.
        http-server
        pause
        exit /b
    )
)

REM If neither Python nor Node is installed
echo.
echo [✗] Error: Neither Python nor Node.js is installed!
echo.
echo Please install one of the following:
echo.
echo Option 1: Python
echo   Download from: https://www.python.org/downloads/
echo   (Make sure to add to PATH during installation)
echo.
echo Option 2: Node.js
echo   Download from: https://nodejs.org/
echo   (Make sure to add to PATH during installation)
echo.
echo After installation, run this script again.
echo.
pause
