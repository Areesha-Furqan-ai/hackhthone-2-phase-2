# Phase II Todo Backend API - Production Deployment

## Overview

Backend API for the Phase II Todo Full-Stack Web Application built with Python FastAPI.

## Features

- RESTful API with authentication
- Task management (CRUD operations)
- User authentication and authorization
- Database integration with SQLModel and SQLite
- CORS support for frontend integration

## Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### Tasks
- `GET /api/v1/tasks` - Get all user tasks
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks/{id}` - Get a specific task
- `PUT /api/v1/tasks/{id}` - Update a task
- `DELETE /api/v1/tasks/{id}` - Delete a task
- `PATCH /api/v1/tasks/{id}/complete` - Toggle task completion

### Health
- `GET /health` - Health check
- `GET /health/database` - Database health check

## Production Deployment Requirements

- Python 3.11+
- pip package manager
- Production database (PostgreSQL recommended for production, SQLite for development)
- Secure environment for storing secrets

## Environment Variables (Production)

Create a `.env` file in the backend directory with the following variables:

```env
NEON_DATABASE_URL=<PRODUCTION_DB_URL>        # PostgreSQL URL: postgresql://user:pass@host:port/dbname
                                                 # SQLite URL: sqlite:///./todo_app.db
BETTER_AUTH_SECRET=<STRONG_SECRET_KEY>      # Secure secret key (32+ random characters)
FRONTEND_URL=<PRODUCTION_FRONTEND_URL>      # Frontend domain for CORS (e.g., https://yourdomain.com)
CORS_ALLOW_ORIGINS=<PRODUCTION_FRONTEND_URL> # Same as FRONTEND_URL
PORT=5000                                   # Port to run the application on (default: 5000)
```

## Installation & Deployment

### Quick Deployment (Linux/macOS)

1. Make sure you have Python 3.11+ installed
2. Clone the repository and navigate to the backend directory
3. Create your `.env` file with production variables
4. Run the deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual Deployment

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements_prod.txt
```

3. Set up environment variables in `.env` file

4. Start the application:
```bash
# For development/testing
python main.py

# For production
uvicorn main:app --host 0.0.0.0 --port 5000 --workers 4
```

### Using Gunicorn (Recommended for Production)

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:5000 --timeout 120 --max-requests 1000 --max-requests-jitter 100
```

## Docker Deployment (Alternative)

1. Build the Docker image:
```bash
docker build -t todo-backend .
```

2. Run the container:
```bash
docker run -d -p 5000:5000 --env-file .env todo-backend
```

## Validation

After deployment, test the API at:

```
https://<your-backend-url>/
```

Expected response:
```json
{
  "message": "Welcome to the Phase II Todo Backend API"
}
```

Health check endpoint:
```
https://<your-backend-url>/health/
```

## Systemd Service (Linux)

For persistent deployment on Linux systems, use the provided systemd service file:

1. Copy `todo-backend.service` to `/etc/systemd/system/`
2. Modify the paths in the service file to match your installation
3. Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable todo-backend
sudo systemctl start todo-backend
```

## Security Notes

- Never commit the `.env` file to version control
- Use strong, randomly generated secrets for `BETTER_AUTH_SECRET`
- Use HTTPS in production
- Regularly update dependencies
- Monitor logs for security issues
- Use PostgreSQL or other production-grade databases instead of SQLite for production deployments