const express = require("express");
const router = express.Router();
const { ForbiddenError, NotFoundError } = require("../errors");
const axios = require('axios');
require('dotenv').config();

// 1. Route Calculation Routes:
//      /api/route/calculate: Calculate truck-friendly routes based on user input (e.g., starting and ending locations, truck specifications).
//      /api/route/save: Save calculated routes to a user's profile (requires authentication).
//      /api/route/history: Retrieve a user's route history (requires authentication).
// 2. External API Integration Routes:
//      /api/tomtom/traffic: Fetch real-time traffic data from the TomTom Traffic API.
//      /api/tomtom/routing: Make requests to the TomTom Routing API for route calculation.
// 3. User Profile Routes:
//      /api/user/profile: Manage user profiles, including updating user information (requires authentication).
//      /api/user/favorites: Allow users to save and retrieve favorite routes or locations (requires authentication).
// 4. Error Handling Routes:
//      Implement routes or middleware to handle errors gracefully and provide meaningful error responses to the client.


router.get("/", (req, res) => {
    res.send("Welcome to HaulerWAY");
});

// Getting the geolocation for an address
async function getCoordinates(location) {
    const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${location}.json`, {
      params: {
        key: process.env.TOMTOM_API_KEY,
      },
    });
    const coordinates = response.data.results[0].position;
    return coordinates;
}

// Route calculation function
async function calculateRoute(startCoordinates, endCoordinates) {
    try {

        const url = `https://api.tomtom.com/routing/1/calculateRoute/${startCoordinates.lat},${startCoordinates.lon}:${endCoordinates.lat},${endCoordinates.lon}/json?key=${process.env.TOMTOM_API_KEY}`;

        const response = await axios.get(url);

        const route = response.data.routes[0];

        return route;

    } catch (error) {
        throw error;
    }
}



// POST route for getting the geolocation and calculating routes
router.post('/calculate-route', async (req, res) => {
    try {
        const { startLocation, endLocation } = req.body; // Extract startLocation and endLocation from the request body

        // Geocoding logic for startLocation
        const startCoordinates = await getCoordinates(startLocation);

        // Geocoding logic for endLocation
        const endCoordinates = await getCoordinates(endLocation);

        // Calculate the route using obtained coordinates
        const route = await calculateRoute(startCoordinates, endCoordinates);

        res.json({ route });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
