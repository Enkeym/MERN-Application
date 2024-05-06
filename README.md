# Project Name

## Overview

This project is a web application built with Node.js, Express, React, Redux, and other technologies. It includes both server-side and client-side code.

## Installation and Setup

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Start the client:
   ```bash
   npm run client
   ```
5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

The project consists of two main directories:

- **Server**: Contains server-side code including routes, controllers, and database configurations.
- **Client**: Contains client-side code including React components, Redux state management, and UI elements.

## Server Dependencies

- **express**: Web framework for Node.js.
- **@prisma/client**: Prisma client for interacting with the database.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens.
- **bcryptjs**: Library for hashing passwords.
- **dotenv**: Module for loading environment variables from a `.env` file.
- **winston**: Logging library for Node.js.

## Client Dependencies

- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: Library for declarative routing in React applications.
- **Redux Toolkit**: Official Redux package for efficient Redux development.
- **React Bootstrap**: Bootstrap components built with React.
- **react-toastify**: Library for displaying toast notifications.
- **react-icons**: Library providing popular icons for React applications.
- **bootstrap**: Front-end framework for developing responsive and mobile-first websites.

## Scripts

- **start**: Starts the server.
- **server**: Starts the server using nodemon for automatic restarts.
- **client**: Starts the client development server.
- **dev**: Concurrently runs both the server and client.
- **build**: Builds the client for production.

## Development Dependencies

- **concurrently**: Utility for running multiple npm scripts concurrently.
- **nodemon**: Utility that automatically restarts the server when changes are detected.
- **prisma**: Database ORM and query builder for Node.js.
- **vite**: Front-end build tool for modern web development.
- **eslint**: JavaScript linting utility.
- **@types/react**: TypeScript type definitions for React.
- **@vitejs/plugin-react**: Vite plugin for React support.

## Author

Nikita Korolev

## License

This project is licensed under the MIT License.
