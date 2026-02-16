# DHMarte Auto Sale Web

A modern, full-stack web application for managing and selling vehicles. This frontend is built with React and React Router, allowing users to browse vehicles, make inquiries, and for logged-in users to manage their vehicle listings, auction listings, and inquiries.

## Features

- **Vehicle Listings**: Browse available vehicles with details including make, model, year, price, color, and mileage
- **Vehicle Details**: View complete vehicle information including photos uploaded by sellers
- **Photo Uploads**: Upload multiple vehicle photos when adding new vehicles (file handling via Multer)
- **Vehicle Management**: Add, edit, and delete vehicles from the inventory (authenticated users only)
- **Vehicle Inquiries**: Submit inquiries about specific vehicles or general inquiries
- **Inquiry Management**: View and delete inquiries (authenticated users)
- **Auction Listings**: Browse and view available auctions
- **Auction Management**: Create and delete auction listings (authenticated users)
- **User Authentication**: Register and log in with JWT tokens for secure access
- **User Dashboard**: Manage your profile, listings, auctions, and inquiries

## Tech Stack

### Frontend

- **React 19**: Frontend framework
- **React Router 7**: Client-side routing
- **Vite**: Build tool and development server

### Backend

- **Node.js 22+**: JavaScript runtime
- **Express 5**: Web server framework
- **PostgreSQL**: Relational database
- **Multer 2**: File upload handling and storage
- **JWT**: Secure user authentication
- **Bcrypt**: Password hashing and encryption
- **CORS**: Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm package manager

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with:

```
VITE_API=http://localhost:5000
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

### Backend Setup

See the backend README for complete setup instructions including:

- PostgreSQL database configuration
- Environment variables setup
- Multer upload configuration
- Database schema initialization

## File Upload Handling

This application uses **Multer** for handling vehicle photo uploads:

### How It Works

1. Users select multiple photos when adding a new vehicle
2. Frontend collects photos with `FormData` API
3. Photos are sent to `/upload` endpoint with the car ID
4. Multer stores files in the `uploads/` directory with timestamped names
5. File paths are saved to `car_photos` table in the database
6. Photos are served via `/uploads/*` static route

### Upload Limitations

- Maximum 10 files per request
- Accepts image files only
- Files are stored on the server filesystem
- File paths are persisted in the database for retrieval

## Database Schema

### Tables

- **users**: User accounts with email and hashed password
- **cars**: Vehicle listings with details (make, model, year, price, etc.)
- **car_photos**: Photos associated with vehicles (references cars via car_id)
- **auctions**: Vehicle auction listings
- **inquiries**: User inquiries about vehicles or general questions

### Key Relationships

- `car_photos.car_id` → `cars.id` (ON DELETE CASCADE)
- `inquiries.car_id` → `cars.id` (ON DELETE SET NULL)

## Project Structure

### Frontend (React)

```
src/
├── api/              # API service functions
│   ├── cars.js       # Car CRUD and photo operations
│   ├── auctions.js   # Auction CRUD operations
│   ├── inquiries.js  # Inquiry submission and management
│   └── users.js      # User authentication
├── auth/             # Authentication context and components
│   ├── AuthContext.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── pages/            # Page components
│   ├── home/
│   │   ├── Home.jsx
│   │   └── User.jsx
│   ├── cars/
│   │   ├── Cars.jsx          # All cars listing
│   │   ├── Car.jsx           # Single car details with photos
│   │   ├── AddCar.jsx        # Create car with photo upload
│   │   ├── EditCar.jsx       # Edit car details
│   │   └── DeleteCar.jsx
│   ├── auctions/
│   │   ├── Auctions.jsx      # All auctions listing
│   │   ├── AddAuction.jsx    # Create new auction
│   │   └── DeleteAuction.jsx
│   ├── inquiries/
│   │   ├── Inquiries.jsx        # User's inquiries
│   │   ├── InqueiryCar.jsx      # Inquire about a car
│   │   └── GeneralInquiries.jsx # General inquiries
│   └── auctions.css
├── layout/           # Layout components
│   ├── Layout.jsx    # Navigation and app shell
│   └── layout.css
├── assets/           # Static assets
├── App.jsx           # Main app component with routes
├── main.jsx          # Entry point
└── index.css         # Global styles
```

### Backend (Node.js/Express)

```
api/
├── cars.js           # Car routes (GET, POST, PUT, DELETE, GET photos)
├── auctions.js       # Auction routes (GET, POST, PUT, DELETE)
├── inquiries.js      # Inquiry routes (GET, POST, DELETE)
└── users.js          # User routes (register, login)
db/
├── client.js         # PostgreSQL client
├── schema.sql        # Database schema
├── seed.js           # Database seeding
└── queries/
    ├── cars.js       # Car database operations (includes photo handling)
    ├── auctions.js   # Auction database operations
    ├── inquiries.js  # Inquiry database operations
    └── users.js      # User database operations
middleware/
├── getUserFromToken  # Extract user from JWT token
├── requireUser       # Middleware to ensure user is authenticated
├── requireBody       # Middleware to validate request body fields
└── handlePostgresErrors
utils/
└── jwt.js            # JWT token creation and verification
uploads/             # Directory for storing uploaded car photos
app.js               # Express app configuration
server.js            # Server entry point
```

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. User tokens are managed through the `AuthContext` which provides the `useAuth()` hook for accessing the current user's token.

### Auth Flow

1. User registers or logs in via `/register` or `/login` endpoints
2. Backend validates credentials and returns a JWT token
3. Token is stored in context and used for all authenticated requests
4. Protected endpoints require the `Authorization: Bearer <token>` header

## API Endpoints

### Users

- `POST /users/register` - Register a new user
- `POST /users/login` - Login user and receive JWT token

### Cars

- `GET /cars` - Get all vehicles
- `GET /cars/:id` - Get a single vehicle by ID
- `GET /cars/:id/photos` - Get all photos for a vehicle
- `POST /cars` - Create a new vehicle (authenticated)
- `PUT /cars/:id` - Update vehicle details (authenticated)
- `DELETE /cars/:id` - Delete a vehicle (authenticated)

### Car Photo Upload

- `POST /upload` - Upload multiple car photos via Multer
  - Supports up to 10 files per request
  - Files are stored in the `uploads/` directory
  - Returns photo file paths for database storage

### Auctions

- `GET /auctions` - Get all auctions
- `GET /auctions/:id` - Get a single auction
- `POST /auctions` - Create a new auction (authenticated)
- `PUT /auctions/:id` - Update auction details (authenticated)
- `DELETE /auctions/:id` - Delete an auction (authenticated)

### Inquiries

- `GET /inquiries` - Get all inquiries
- `POST /inquiries` - Submit a new inquiry
- `DELETE /inquiries/:id` - Delete an inquiry (authenticated)
