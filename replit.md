# AgriTrack - Fleet Management System

## Overview
AgriTrack is an industry-grade React Native mobile application for agricultural fleet management. It manages tractors, implements, operations, fuel logs, and alerts with complete user data isolation.

## Project Structure
```
├── backend/                 # Python FastAPI backend
│   ├── server.py           # Main server entry point (port 5000)
│   ├── main.py             # FastAPI routes and endpoints
│   ├── database.py         # PostgreSQL connection and schema
│   ├── auth.py             # JWT authentication
│   ├── schemas.py          # Pydantic models
│   └── requirements.txt
├── rn-app/                 # React Native Expo app
│   ├── App.tsx             # App entry point
│   ├── src/
│   │   ├── config.ts       # API configuration
│   │   ├── services/api.ts # API service layer
│   │   ├── contexts/AuthContext.tsx
│   │   ├── navigation/AppNavigator.tsx
│   │   └── screens/        # All app screens by role
│   ├── package.json
│   └── app.json
├── SETUP_GUIDE.md          # Complete setup documentation
```

## Tech Stack
- **Backend**: Python 3.11, FastAPI, PostgreSQL, JWT auth, psycopg2
- **Mobile App**: React Native (Expo 54), NativeWind, React Navigation
- **Database**: PostgreSQL (Replit-managed or local)

## Port Configuration
| Service          | Port  |
|-----------------|-------|
| FastAPI Backend | 5000  |
| PostgreSQL      | 5432  |
| Expo Metro      | 8081  |

## Running the Application

### Backend (Replit)
The workflow runs: `python backend/server.py`
- API available at: `https://<replit-domain>/api`

### Mobile App (Local Development)
```bash
cd rn-app
npm install
npx expo start
```

## API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/dashboard/stats` - Dashboard statistics (user-filtered)
- `GET/POST/DELETE /api/tractors` - Tractor CRUD (user-filtered)
- `GET/POST/DELETE /api/implements` - Implement CRUD (user-filtered)
- `GET/POST /api/operations` - Operations (user-filtered)
- `GET/POST /api/fuel-logs` - Fuel logging (user-filtered)
- `GET/POST /api/alerts` - Alert management (user-filtered)
- `GET /api/reports` - Reporting (user-filtered)

## User Roles & Permissions
| Role     | Tractors | Implements | Operations | Alerts | Reports |
|----------|----------|------------|------------|--------|---------|
| Owner    | CRUD     | CRUD       | View       | View   | View    |
| Operator | View     | View       | Create     | Create | -       |
| Farmer   | View     | View       | View       | View   | View    |

## Data Isolation
- Each user only sees their own data
- Tractors/implements linked by owner_id
- Operations, alerts, fuel logs filter by owner's tractors
- No cross-user data visibility

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured on Replit)
- `SESSION_SECRET` - JWT signing secret (optional, has default)
- `EXPO_PUBLIC_API_URL` - API URL for mobile app

## Security - Data Isolation
All API endpoints enforce strict user data isolation:
- **UPDATE/DELETE**: Tractor/implement updates validate owner_id to prevent unauthorized modification
- **CREATE**: Operations, fuel logs, alerts validate tractor/implement ownership before creation
- **READ**: All data queries filter by owner_id via JOINs
- **Telemetry**: Creation and retrieval validate tractor ownership
- **Reports**: All report queries (operations, fuel logs, alerts) filter by owner's tractors

## Recent Changes
- 2026-02-04: Fixed IDOR vulnerabilities in UPDATE/DELETE endpoints with owner_id validation
- 2026-02-04: Added ownership validation to all CREATE endpoints (operations, fuel logs, alerts, telemetry)
- 2026-02-04: Reports endpoint now filters all queries by owner_id
- 2026-02-04: Stop operation and resolve alert validate ownership via JOIN
- 2026-02-04: Removed web app, focused on React Native mobile only
- 2026-02-04: Created comprehensive SETUP_GUIDE.md for local development
- 2026-02-04: Backend runs on port 5000 for Replit compatibility
