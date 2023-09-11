const express = require("express");
const router = express.Router();
const { ForbiddenError, NotFoundError } = require("../errors");
const axios = require('axios');
require('dotenv').config();


router.get("/", (req, res) => {
    res.send("Welcome to HaulerWAY");
});

// A function to compare the fastest route
function compareRoutes(routes) {
    // Sort routes based on estimated travel time (assuming travel time is in seconds)
    routes.sort((route1, route2) => route1.summary.travelTimeInSeconds - route2.summary.travelTimeInSeconds);

    const fastestRoute = routes[0];

    return fastestRoute;
}

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
async function calculateRoutes(payload) {
    try {

        let url;
          // Construct the URL for route calculation with alternatives
        if (payload.vehicleLoadType) {
            url = `https://api.tomtom.com/routing/1/calculateRoute/${payload.startCoordinates.lat},${payload.startCoordinates.lon}:${payload.endCoordinates.lat},${payload.endCoordinates.lon}/json?routeType=fastest&traffic=true&travelMode=${payload.vehicleType}&vehicleCommercial=true&vehicleLoadType=${payload.vehicleLoadType}&key=${process.env.TOMTOM_API_KEY}`;
        } else {
            url = `https://api.tomtom.com/routing/1/calculateRoute/${payload.startCoordinates.lat},${payload.startCoordinates.lon}:${payload.endCoordinates.lat},${payload.endCoordinates.lon}/json?routeType=fastest&traffic=true&travelMode=truck&vehicleCommercial=true&key=${process.env.TOMTOM_API_KEY}`;
        }

        const response = await axios.get(url);
        const route = response.data.routes[0];

        return route;
    } catch (error) {
        throw error;
    }
}


// GET route for getting the geolocation and calculating routes
router.get('/calculate-route', async (req, res) => {
    try {
        const { startLocation, endLocation, vehicleType, vehicleLoadType } = req.body;

        // Geocoding logic for startLocation
        const startCoordinates = await getCoordinates(startLocation);

        // Geocoding logic for endLocation
        const endCoordinates = await getCoordinates(endLocation);


        // Construct the payload with optional vehicleLoadType
        const payload = {
            startCoordinates,
            endCoordinates,
            vehicleType: vehicleType || 'truck',
            vehicleLoadType: vehicleLoadType || undefined,
        };

        // Calculate the route using obtained coordinates and vehicleLoadType
        const routes = await calculateRoutes(payload);

        // Compare routes to find the fastest route
        //const fastestRoute = compareRoutes(routes);

        res.json({ routes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;