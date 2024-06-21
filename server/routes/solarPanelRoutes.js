const express = require('express');
const router = express.Router();
const solarPanelController = require('../controllers/solarPanelController');

// POST request to create a new solar panel installation request
router.post('/installation', solarPanelController.createSolarPanelRequest);

// GET request to fetch all solar panel installation requests
router.get('/installation', solarPanelController.findAllSolarPanelRequests);

// GET request to fetch a single solar panel installation request by ID
router.get('/installation/:id', solarPanelController.findOneSolarPanelRequest);

// DELETE request to delete a single solar panel installation request by ID
router.delete('/installation/:id', solarPanelController.deleteOneSolarPanelRequest);

module.exports = router;
