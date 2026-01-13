# Backend Production Deployment Guide

This guide provides instructions for deploying the Phase II Todo Backend API to a production environment.

## Prerequisites

- Python 3.11+
- pip package manager
- Access to production database (PostgreSQL/Neon or SQLite)
- Secure environment for storing secrets

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install fastapi uvicorn sqlmodel aiosqlite pydantic-settings python-dotenv python-jose passlib[bcrypt] motor psycopg2-binary
```

Or install from requirements.txt:

```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
NEON_DATABASE_URL=<PRODUCTION_DB_URL>        # e.g., postgresql://user:password@host:port/dbname or sqlite:///./todo_app.db
BETTER_AUTH_SECRET=<STRONG_SECRET_KEY>      # secure secret key (recommended: 32+ random characters)
FRONTEND_URL=<PRODUCTION_FRONTEND_URL>      # used for CORS (e.g., https://yourdomain.com)
CORS_ALLOW_ORIGINS=<PRODUCTION_FRONTEND_URL> # same as frontend URL
PORT=5000                                   # port to run the application on
```

**Security Note**: Do not commit the `.env` file to version control. Store it securely on your production server.

## Running the Application

### Development Mode

```bash
python main.py
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 5000 --workers 4 --reload=False
```

Or using gunicorn for better production performance:

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:5000
```

## Docker Deployment (Optional)

Create a `Dockerfile` in the backend directory:

```Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
```

Build and run the container:

```bash
docker build -t todo-backend .
docker run -d -p 5000:5000 --env-file .env todo-backend
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEON_DATABASE_URL` | Database connection string | `postgresql://user:pass@host:5432/dbname` or `sqlite:///./todo_app.db` |
| `BETTER_AUTH_SECRET` | Secret key for JWT tokens | Random 32+ character string |
| `FRONTEND_URL` | Frontend application URL for CORS | `https://yourdomain.com` |
| `CORS_ALLOW_ORIGINS` | Allowed origins for CORS | `https://yourdomain.com` |
| `PORT` | Port number to run the app | `5000` |

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

Test the health endpoint:

```
https://<your-backend-url>/health/
```

## Troubleshooting

1. **Database Connection Issues**: Verify the `NEON_DATABASE_URL` is correct and the database server is accessible.
2. **CORS Issues**: Check that `FRONTEND_URL` and `CORS_ALLOW_ORIGINS` match your frontend domain.
3. **Port Binding**: Ensure the specified port is available and not blocked by firewall.
4. **Secret Keys**: Make sure `BETTER_AUTH_SECRET` is strong and kept secure.

## Security Best Practices

1. Use HTTPS in production
2. Keep your `.env` file secure and never commit to version control
3. Regularly rotate secret keys
4. Monitor logs for suspicious activity
5. Use a production-ready database (PostgreSQL recommended over SQLite for production)
6. Set up proper error monitoring and alerting