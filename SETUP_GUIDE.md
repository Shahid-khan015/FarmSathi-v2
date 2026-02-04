# AgriTrack Fleet Management - Local Development Setup Guide

## Overview
AgriTrack is an industry-grade React Native mobile application for agricultural fleet management. This guide covers setting up and running the application locally.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Native App (Expo)                   │
│                      Port: 8081 (Metro)                      │
│                                                              │
│  ┌──────────────┬──────────────┬──────────────┐             │
│  │    Owner     │   Operator   │    Farmer    │             │
│  │  Dashboard   │  Dashboard   │  Dashboard   │             │
│  │    Fleet     │              │   Alerts     │             │
│  │  Management  │              │   Reports    │             │
│  └──────────────┴──────────────┴──────────────┘             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   FastAPI Backend Server                     │
│                       Port: 5000                             │
│                                                              │
│  Endpoints:                                                  │
│  - POST /api/auth/login, /api/auth/register                 │
│  - GET/POST/DELETE /api/tractors                            │
│  - GET/POST/DELETE /api/implements                          │
│  - GET/POST /api/operations                                  │
│  - GET/POST /api/fuel-logs                                   │
│  - GET/POST /api/alerts                                      │
│  - GET /api/reports                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ psycopg2
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│                       Port: 5432                             │
│                                                              │
│  Tables: users, tractors, implements, operations,           │
│          telemetry, fuel_logs, alerts                        │
└─────────────────────────────────────────────────────────────┘
```

## Port Configuration

| Service              | Port  | Description                          |
|---------------------|-------|--------------------------------------|
| FastAPI Backend     | 5000  | REST API server                      |
| PostgreSQL          | 5432  | Database server                      |
| Expo Metro Bundler  | 8081  | React Native development server      |
| Expo Dev Client     | 19000 | Expo development tools               |

## Prerequisites

1. **Node.js** (v18 or later)
2. **Python** (3.11 or later)
3. **PostgreSQL** (14 or later)
4. **Expo CLI** (`npm install -g expo-cli`)
5. **Expo Go app** on your mobile device (iOS/Android)

## Database Setup

### Option 1: Local PostgreSQL
```bash
# Create database
createdb agritrack_db

# Set environment variable
export DATABASE_URL="postgresql://username:password@localhost:5432/agritrack_db"
```

### Option 2: Using .env file
Create `backend/.env`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/agritrack_db
SESSION_SECRET=your-secret-key-here
```

### Database Schema
The schema is automatically created on server startup. Tables include:
- **users** - User accounts with roles (owner, operator, farmer)
- **tractors** - Fleet tractors (owner_id for isolation)
- **implements** - Farm implements (owner_id for isolation)
- **operations** - Active/completed operations
- **telemetry** - GPS and sensor data
- **fuel_logs** - Fuel consumption records
- **alerts** - System alerts and notifications

## Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the server
python server.py
```

The server will:
1. Connect to PostgreSQL
2. Create database tables if they don't exist
3. Start listening on port 5000

**API Documentation**: http://localhost:5000/api/docs

## Mobile App Setup

### Step 1: Install Dependencies
```bash
cd rn-app
npm install
```

### Step 2: Configure API URL
Edit `rn-app/src/config.ts`:

```typescript
const ENV = {
  dev: {
    // Replace with your computer's local IP address
    apiUrl: 'http://192.168.1.XXX:5000/api',
  },
  prod: {
    apiUrl: 'https://your-production-domain.com/api',
  },
};
```

**Important**: Use your computer's local IP address, not `localhost`, since the mobile device needs to reach your computer over the network.

To find your IP:
- **Windows**: `ipconfig`
- **Mac/Linux**: `ifconfig` or `ip addr`

### Step 3: Start Expo
```bash
npx expo start
```

### Step 4: Run on Device/Emulator
- **Physical Device**: Scan QR code with Expo Go app
- **Android Emulator**: Press `a`
- **iOS Simulator**: Press `i`

## User Roles and Data Isolation

### Role Permissions
| Role     | Tractors | Implements | Operations | Alerts | Reports |
|----------|----------|------------|------------|--------|---------|
| Owner    | CRUD     | CRUD       | View       | View   | View    |
| Operator | View     | View       | Create     | Create | -       |
| Farmer   | View     | View       | View       | View   | View    |

### Data Isolation
- Each user only sees data from their own account
- Tractors and implements are linked to owner_id
- Operations, alerts, and fuel logs filter by owner's tractors
- No cross-user data visibility

## API Endpoints Reference

### Authentication
```
POST /api/auth/register
Body: { username, password, fullName, role, phone }

POST /api/auth/login
Body: { username, password }
Response: { token, user }
```

### Tractors (Owner/Operator only)
```
GET    /api/tractors           - List user's tractors
POST   /api/tractors           - Add new tractor
PATCH  /api/tractors/:id       - Update tractor
DELETE /api/tractors/:id       - Delete tractor (owner only)
```

### Implements (Owner/Operator only)
```
GET    /api/implements         - List user's implements
POST   /api/implements         - Add new implement
PATCH  /api/implements/:id     - Update implement
DELETE /api/implements/:id     - Delete implement (owner only)
```

### Operations
```
GET    /api/operations         - List operations
POST   /api/operations         - Start new operation
POST   /api/operations/:id/stop - Stop operation
```

### Alerts
```
GET    /api/alerts             - List alerts
POST   /api/alerts             - Create alert
POST   /api/alerts/:id/resolve - Mark alert as resolved
```

### Dashboard & Reports
```
GET /api/dashboard/stats       - Dashboard statistics
GET /api/reports               - Operations report with filters
```

## Testing the Application

### 1. Register Users
Create accounts for each role to test isolation:
```
User 1: owner1 / password123 / Role: owner
User 2: owner2 / password123 / Role: owner
User 3: operator1 / password123 / Role: operator
```

### 2. Test Data Isolation
- Login as owner1, add tractors
- Login as owner2, verify owner1's tractors are NOT visible
- Each user should only see their own data

### 3. Test CRUD Operations
- Add/Edit/Delete tractors and implements
- Verify changes persist after logout/login
- Test pull-to-refresh functionality

## Troubleshooting

### Connection Issues
1. Verify backend is running: `curl http://localhost:5000/health`
2. Check database connection: Verify DATABASE_URL is correct
3. Ensure mobile device is on same network as development machine

### Database Issues
```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# View database logs
tail -f /var/log/postgresql/postgresql-*.log
```

### Expo Issues
```bash
# Clear Expo cache
npx expo start --clear

# Reset Metro bundler
rm -rf node_modules/.cache
```

## Production Deployment

### Backend
1. Set `SESSION_SECRET` environment variable (secure random string)
2. Configure production DATABASE_URL
3. Use gunicorn for production: `gunicorn -w 4 -b 0.0.0.0:5000 server:app`

### Mobile App
1. Update `config.ts` with production API URL
2. Build production app: `npx expo build:android` or `npx expo build:ios`
3. Submit to app stores

## Security Considerations

- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt
- All API endpoints require authentication (except login/register)
- CORS is configured to allow requests from any origin (restrict in production)
- User data is isolated by owner_id at database level

step by step Setup instruction - 
npx expo start --localhost
reveres port to 8000
run FastApi server


