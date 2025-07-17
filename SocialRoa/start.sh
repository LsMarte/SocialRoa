#!/bin/bash

# Start the backend server
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Start the frontend server
echo "Starting frontend server..."
cd ../frontend-new
npm start &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID
wait $FRONTEND_PID
