# DHMarte Auto Sale Web

A modern, full-stack web application for managing and selling vehicles. This frontend is built with React and React Router, allowing users to browse vehicles, make inquiries, and for the logged in user manage their vehicle listings, auction listings, and inquiries.

## Features

- **Vehicle Listings**: Browse available vehicles with details including make, model, year, and price
- **Vehicle Management**: Add new vehicles to the inventory (authenticated users)
- **Delete Vehicles**: Remove vehicles from the inventory (authenticated users)
- **Vehicle Inquiries**: Submit inquiries about specific vehicles
- **User Authentication**: Register and log in to access protected features
- **User Dashboard**: View and manage your profile and inquiries
- **Inquiry Management**: Track and manage all vehicle inquiries

## Tech Stack

- **React 19**: Frontend framework
- **React Router 7**: Client-side routing
- **Vite**: Build tool and development server

## Prerequisites

- Node.js >= 22.0.0
- npm package manager

## Project Structure

```
src/
├── api/              # API service functions
├── auth/             # Authentication context and components
├── pages/            # Page components
│   ├── home/
│   │   ├── Home.jsx
│   │   └── User.jsx
│   ├── cars/
│   │   ├── Cars.jsx
│   │   ├── Car.jsx
│   │   └── AddCar.jsx
│   ├── auctions/
│   │   ├── Auctions.jsx
│   │   ├── AddAuction.jsx
│   │   └── DeleteAuction.jsx
│   ├── inquiries/
│   │   ├── Inquiries.jsx
│   │   ├── InqueiryCar.jsx
│   │   └── GeneralInquiries.jsx
│   └── auctions.css
├── layout/           # Layout components
│   ├── Layout.jsx
│   └── layout.css
├── assets/           # Static assets
├── App.jsx           # Main app component with routes
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Authentication

The application uses JWT tokens for authentication. User tokens are managed through the `AuthContext` which provides the `useAuth()` hook for accessing the current user's token.
