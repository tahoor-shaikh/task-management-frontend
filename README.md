# Task Management App

A React Native mobile application for managing tasks with user authentication. Built with Expo and TypeScript.

## Features

- User Authentication (Login/Signup)
- Task Management (Create, View, Update tasks)
- Password Change Functionality
- Toast Notifications
- Form Validation
- Secure API Integration

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type-safe programming
- **Redux** - State management
- **React Navigation** - Navigation management

## Project Structure

```
src/
├── components/       # Reusable UI components
├── constants/        # Constants and configurations
├── controllers/      # Business logic controllers
├── navigation/       # Navigation setup and types
├── screens/         # Application screens
│   ├── auth/        # Authentication screens
│   └── main/        # Main app screens
├── services/        # API and external services
├── store/          # Redux store and slices
├── types/          # TypeScript types/interfaces
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-management-app
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Start the development server:

```bash
yarn start
# or
npm start
```

4. Run on specific platform:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Development

### Authentication Flow

The app implements a complete authentication flow with:

- Login screen (`src/screens/auth/LoginScreen.tsx`)
- Signup screen (`src/screens/auth/SignupScreen.tsx`)
- Password change functionality (`src/screens/main/ChangePasswordScreen.tsx`)

### Task Management

Task-related features include:

- Home screen with task list (`src/screens/main/HomeScreen.tsx`)
- Add task screen (`src/screens/main/AddTaskScreen.tsx`)
- Task details screen (`src/screens/main/TaskDetailsScreen.tsx`)

### API Integration

API communication is handled through:

- `ApiService.ts` - Base API configuration and methods
- `AuthController.ts` - Authentication-related API calls
- `TasksController.ts` - Task-related API calls

### State Management

Redux is used for state management with:

- Centralized store configuration (`src/store/index.ts`)
- Auth slice for authentication state (`src/store/auth/authSlice.ts`)
