#!/bin/bash
# Production deployment script for Phase II Todo Backend API

set -e  # Exit on any error

echo "Starting production deployment..."

# Check if Python 3.11+ is available
PYTHON_VERSION=$(python --version 2>&1 | cut -d' ' -f2)
echo "Detected Python version: $PYTHON_VERSION"

if [[ $(printf '%s\n' "$PYTHON_VERSION" "3.11" | sort -V | head -n1) != "3.11" ]]; then
    echo "Error: Python 3.11+ is required. Detected: $PYTHON_VERSION"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install production dependencies
echo "Installing production dependencies..."
pip install -r requirements_prod.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found!"
    echo "Please create a .env file with the following variables:"
    echo "NEON_DATABASE_URL="
    echo "BETTER_AUTH_SECRET="
    echo "FRONTEND_URL="
    echo "CORS_ALLOW_ORIGINS="
    echo "PORT=5000"
    exit 1
fi

# Validate required environment variables
if [ -z "$NEON_DATABASE_URL" ] || [ -z "$BETTER_AUTH_SECRET" ]; then
    echo "Loading environment variables from .env file..."
    export $(cat .env | xargs)
fi

# Check if required environment variables are set
if [ -z "$NEON_DATABASE_URL" ] || [ -z "$BETTER_AUTH_SECRET" ]; then
    echo "Error: Required environment variables are not set!"
    echo "Please ensure NEON_DATABASE_URL and BETTER_AUTH_SECRET are set in .env"
    exit 1
fi

# Run database migrations (if any)
echo "Initializing database..."
python -c "
import asyncio
from database.engine import create_db_and_tables
asyncio.run(create_db_and_tables())
print('Database initialized successfully')
"

# Start the application using gunicorn
echo "Starting application on port $PORT..."
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:$PORT --timeout 120 --max-requests 1000 --max-requests-jitter 100

echo "Application deployed successfully!"