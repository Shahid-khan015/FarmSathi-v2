# Fleet Management Mobile App

## Overview
A comprehensive Fleet Management system consisting of a FastAPI backend and a React Native Expo mobile application. The system helps manage tractors, implements, operations, fuel logs, alerts, and reports for agricultural fleet management.

## Project Architecture

### Backend (FastAPI + PostgreSQL)
Located in `/backend/`:
- **main_sqlalchemy.py**: Main FastAPI application with all API endpoints
- **models.py**: SQLAlchemy database models (User, Tractor, Implement, Operation, Telemetry, FuelLog, Alert)
- **schemas.py**: Pydantic request/response schemas
- **auth.py**: JWT authentication with role-based access
- **database.py**: Database connection and SQLAlchemy setup

**API Endpoints:**
- `/api/auth/login`, `/api/auth/register` - Authentication
- `/api/dashboard/stats` - Dashboard statistics
- `/api/tractors` - Tractor CRUD operations
- `/api/implements` - Implement CRUD operations
- `/api/operations` - Field operations management
- `/api/telemetry/{operation_id}` - GPS/telemetry data
- `/api/fuel-logs` - Fuel consumption tracking
- `/api/alerts` - Alert management
- `/api/reports` - Reporting with date filtering

### Mobile App (React Native Expo)
Located in `/mobile/`:
- **App.js**: Main application entry with AuthProvider
- **src/screens/**: All screens (Login, Register, Dashboard, Tractors, Implements, Operations, FuelLogs, Alerts, Reports)
- **src/components/**: Reusable UI components (Button, Input, Card, Header, AreaCalculationWidget, StatCard, ListItem, etc.)
- **src/services/**: API service layer (api.js, authService.js, dataService.js)
- **src/context/**: AuthContext for authentication state
- **src/navigation/**: React Navigation setup with tabs and stacks
- **src/constants/**: Theme colors, sizes, and API configuration

## Key Features

### Mobile App Features:
1. **Authentication**: Login/Register with JWT tokens
2. **Dashboard**: Overview with stats cards and quick actions
3. **Tractors Management**: Add, edit, delete tractors
4. **Implements Management**: Track equipment with operation types
5. **Operations**: Start/stop field operations with tractor+implement
6. **Fuel Logs**: Track fuel consumption
7. **Alerts**: View and resolve system alerts
8. **Reports**: Filter by day, week, month
9. **Area Calculation Widget**: Field map placeholder on all screens

### Design Principles:
- Professional green color scheme (#2E7D32) for agriculture
- Consistent UI components across all screens
- Shadow effects and rounded corners
- Ionicons for all icons
- Responsive design for web and mobile

## Running the Application

### Backend (Port 8000):
```bash
cd backend && python -c "import uvicorn; from main_sqlalchemy import app; uvicorn.run(app, host='0.0.0.0', port=8000)"
```

### Mobile App (Port 5000):
```bash
cd mobile && npm run web
```

## Database
- PostgreSQL database
- Tables: users, tractors, implements, operations, telemetry, fuel_logs, alerts
- Uses SQLAlchemy ORM

## Recent Changes (January 2026)
- Created complete React Native Expo mobile app in JavaScript
- Implemented all screens with consistent UI/UX
- Added AreaCalculationWidget placeholder on all user screens
- Integrated with FastAPI backend
- Configured for web deployment on port 5000
