#!/bin/bash
set -e

echo "📦 Installing dependencies..."
npm install --only=prod > /dev/null 2>&1

echo "🏗️ Building server..."
cd server
npm run build > /dev/null 2>&1
cd ..

echo "🏗️ Building client..."
cd client
npm run build > /dev/null 2>&1
cd ..

echo "✅ Build complete!"
echo "📍 Starting server on port $PORT"

node server/dist/index.js
