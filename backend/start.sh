#!/bin/bash
# Simple start script for Phase II Todo Backend API

# Load environment variables from .env file
if [ -f ".env" ]; then
    export $(cat .env | xargs)
fi

# Set default port if not set
PORT=${PORT:-5000}

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Start the application
echo "Starting Phase II Todo Backend API on port $PORT..."
uvicorn main:app --host 0.0.0.0 --port $PORT --workers 4