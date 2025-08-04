# Health Check Server

A Node.js/Express API server for managing health declarations using MongoDB.

## Features

- Health declaration submission with validation
- Paginated declaration retrieval
- MongoDB integration with Mongoose
- CORS configuration
- TypeScript
- Unit testing with Jest
- Input validation and error handling

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest w& Supertest
- **Validation**: Custom input validation
- **CORS**: Configurable whitelist

## API Endpoints

- POST (`/api/declarations`) - Create a new health declaration 
- GET (`/api/declarations`) - Get paginated health declarations 

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database (cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd healthcheck-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your values:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   CORS_WHITELIST=CLIENT_URL
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## API Usage

### Create Declaration

```bash
curl -X POST http://localhost:3000/api/declarations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "temperature": 36.5,
    "hasSymptoms": false,
    "contactWithCovid": false
  }'
```

### Get Declarations

```bash
# Get all declarations (default pagination)
curl http://localhost:3000/api/declarations

# Get with custom pagination
curl "http://localhost:3000/api/declarations?page=1&limit=5"
```

## Data Model

### Declaration Schema

```typescript
{
  name: string;              // Full name (required)
  temperature: number;       // Body temperature 35-42°C (required)
  hasSymptoms: boolean;      // Any COVID symptoms (required)
  contactWithCovid: boolean; // Contact with COVID cases (required)
  submissionDate: Date;      // Auto-generated timestamp
}
```

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

Tests use a separate test database to avoid affecting production data.

## Environment Variables

- `PORT`: Server port (default: `3000`)
- `MONGODB_URI`: MongoDB connection string (example: `mongodb+srv://...`)
- `CORS_WHITELIST`: Allowed origins, comma-separated (example: `http://localhost:3000,https://myapp.com`)

## Project Structure

```
src/
├── config/
│   └── db.ts              # Database connection
├── controllers/
│   └── declarationController.ts  # Request handlers
├── models/
│   └── Declaration.ts     # Mongoose schema
├── routes/
│   └── declarationRoutes.ts      # Route definitions
├── __tests__/
│   ├── setup.ts          # Test configuration
│   └── declarations.test.ts      # API tests
└── index.ts              # Express app setup
```


Built by Timothy Loh