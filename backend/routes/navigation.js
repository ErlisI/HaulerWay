const express = require("express");
const router = express.Router();
const { ForbiddenError, NotFoundError } = require("../errors");
const axios = require('axios');
require('dotenv').config();


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

// Address search endpoint
router.get('/searchAddress', async (req, res) => {
    try {
      const { query } = req.query; // Get the user's search query from the request
  
      const limit = 5;
      const url = `https://www.mapquestapi.com/search/v3/prediction?key=${process.env.MAPQUEST_API_KEY}&limit=${limit}&collection=adminArea,poi,address,category,franchise,airport&q=query`;
  
      const response = await axios.get(url);
  
      const predictions = response.data.results;
  
      res.json(predictions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

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

        res.json({ routes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;