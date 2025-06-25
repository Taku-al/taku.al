# Taku

A booking system with API, Web, and Mobile apps.

## 📁 Project Structure

```
booking-system/
├── api/           # Fastify API server
├── web/           # React web app
├── mobile/        # React Native mobile app
├── shared/        # Shared types, utilities, constants
└── scripts/       # Deployment scripts
```

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development environment
npm run dev
```

This starts:
- API server on http://localhost:3001
- Web app on http://localhost:3000

### Production
```bash
# Deploy to production
npm run deploy:prod
```

## 🔌 API Endpoints

Simple API structure:
- **Health Check**: `GET /health`
- **API Info**: `GET /api`
- **All Routes**: `GET /api/v1/*`

### Example API Calls

```bash
# Health check
curl http://localhost:3001/health

# API information
curl http://localhost:3001/api

# API routes
curl http://localhost:3001/api/v1/appointment
curl http://localhost:3001/api/v1/service
curl http://localhost:3001/api/v1/auth/login
```

### Using the API Client

```typescript
import { bookingAPI } from '@booking/shared';

// Get appointments
const appointments = await bookingAPI.getAppointments();

// Create appointment
const newAppointment = await bookingAPI.createAppointment({
  serviceId: '123',
  date: new Date(),
  startTime: '14:00'
});
```

## 📋 Versioning Strategy

### How It Works
- **All apps share the same version** (1.0.0, 1.1.0, etc.)
- **One command updates all packages** at once
- **Git tags** are automatically created for releases

### Version Commands

```bash
# Check current versions
npm run status

# Bump patch version (1.0.0 → 1.0.1) - Bug fixes
npm run version:patch

# Bump minor version (1.0.0 → 1.1.0) - New features
npm run version:minor

# Bump major version (1.0.0 → 2.0.0) - Breaking changes
npm run version:major
```

### Daily Workflow

#### 1. Development
```bash
npm run dev
# Make changes, test locally
git add . && git commit -m "feat: add new booking feature"
```

#### 2. Release
```bash
npm run version:minor  # Bumps all packages + creates git tag
git push && git push --tags
```

#### 3. Deploy
```bash
npm run deploy:prod
```

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start API + Web
npm run dev:api          # Start API only
npm run dev:web          # Start Web only
npm run dev:mobile       # Start Mobile only

# Building
npm run build            # Build all packages
npm run build:shared     # Build shared package
npm run build:api        # Build API
npm run build:web        # Build Web
npm run build:mobile     # Build Mobile

# Testing
npm test                 # Run all tests
npm run test:api         # Test API
npm run test:web         # Test Web
npm run test:mobile      # Test Mobile

# Versioning
npm run status           # Show current versions
npm run version:patch    # Bump patch version
npm run version:minor    # Bump minor version
npm run version:major    # Bump major version

# Deployment
npm run deploy:dev       # Deploy to development
npm run deploy:prod      # Deploy to production

# Utilities
npm run clean            # Clean build files
npm run migrate          # Run database migrations
```

## 📦 Shared Package

The `shared/` folder contains code used by all apps:
- **Types**: TypeScript interfaces
- **Constants**: API endpoints, status codes
- **Utilities**: Date formatting, validation
- **API Client**: Pre-configured API client

### Using Shared Code
```typescript
// In any app
import { 
  Appointment, 
  formatDate, 
  API_ENDPOINTS,
  bookingAPI 
} from '@booking/shared';

// Use the API client
const appointments = await bookingAPI.getAppointments();
```

## 🌍 Environments

### Development
- **API**: http://localhost:3001
- **Web**: http://localhost:3000
- **Database**: Local PostgreSQL

### Production
- **API**: https://api.taku.al
- **Web**: https://taku.al
- **Database**: Production PostgreSQL

## 📈 Version History

- **v1.0.0**: Initial release
- **v1.1.0**: Add recurring appointments
- **v1.2.0**: Add mobile app

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Create PR
5. Merge to main
6. Bump version
7. Deploy

---

**Current Version**: 1.0.0 