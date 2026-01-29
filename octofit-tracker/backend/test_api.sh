#!/bin/bash

# Test script for OctoFit Tracker API
echo "Testing OctoFit Tracker API endpoints..."
echo "==========================================="
echo ""

# Get the CODESPACE_NAME
echo "CODESPACE_NAME: $CODESPACE_NAME"

# Derive BASE_URL from CODESPACE_NAME, falling back to localhost
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
else
    BASE_URL="http://localhost:8000"
fi
echo "Using BASE_URL: $BASE_URL"
echo ""

# Test API root
echo "1. Testing API root endpoint..."
curl -s "${BASE_URL}/api/" | python -m json.tool
echo ""

# Test users endpoint
echo "2. Testing users endpoint..."
curl -s "${BASE_URL}/api/users/" | python -m json.tool | head -20
echo ""

# Test teams endpoint
echo "3. Testing teams endpoint..."
curl -s "${BASE_URL}/api/teams/" | python -m json.tool | head -20
echo ""

# Test activities endpoint
echo "4. Testing activities endpoint..."
curl -s "${BASE_URL}/api/activities/" | python -m json.tool | head -20
echo ""

# Test leaderboard endpoint
echo "5. Testing leaderboard endpoint..."
curl -s "${BASE_URL}/api/leaderboard/" | python -m json.tool | head -20
echo ""

# Test workouts endpoint
echo "6. Testing workouts endpoint..."
curl -s "${BASE_URL}/api/workouts/" | python -m json.tool | head -20
echo ""

echo "==========================================="
echo "API testing complete!"
