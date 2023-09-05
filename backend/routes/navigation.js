const express = require("express");
const router = express.Router();
const { ForbiddenError, NotFoundError } = require("../errors");


// 1. User Authentication Routes:
//      /api/auth/register: Handle user registration.
//      /api/auth/login: Handle user login.
//      /api/auth/logout: Handle user logout.
//      /api/auth/user: Fetch user information (requires authentication).
// 2. Route Calculation Routes:
//      /api/route/calculate: Calculate truck-friendly routes based on user input (e.g., starting and ending locations, truck specifications).
//      /api/route/save: Save calculated routes to a user's profile (requires authentication).
//      /api/route/history: Retrieve a user's route history (requires authentication).
// 3. External API Integration Routes:
//      /api/tomtom/traffic: Fetch real-time traffic data from the TomTom Traffic API.
//      /api/tomtom/routing: Make requests to the TomTom Routing API for route calculation.
// 4. User Profile Routes:
//      /api/user/profile: Manage user profiles, including updating user information (requires authentication).
//      /api/user/favorites: Allow users to save and retrieve favorite routes or locations (requires authentication).
// 5. Error Handling Routes:
//      Implement routes or middleware to handle errors gracefully and provide meaningful error responses to the client.