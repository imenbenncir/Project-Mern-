const SolarPanel = require('../models/solarPanel');

// Handle POST request for creating a new solar panel installation request
exports.createSolarPanelRequest = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            powerNeeded,
            availableSpace,
            description
        } = req.body;

        const newSolarPanel = new SolarPanel({
            name,
            email,
            phone,
            powerNeeded,
            availableSpace,
            description
        });

        const savedSolarPanel = await newSolarPanel.save();
        res.status(201).json(savedSolarPanel);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Handle GET request to fetch all solar panel installation requests
exports.findAllSolarPanelRequests = async (req, res) => {
    try {
        const solarPanels = await SolarPanel.find();
        res.status(200).json(solarPanels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Handle GET request to fetch a single solar panel installation request by ID
exports.findOneSolarPanelRequest = async (req, res) => {
    try {
        const solarPanel = await SolarPanel.findById(req.params.id);
        if (!solarPanel) {
            return res.status(404).json({ message: 'Solar panel installation request not found' });
        }
        res.status(200).json(solarPanel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Handle DELETE request to delete a single solar panel installation request by ID
exports.deleteOneSolarPanelRequest = async (req, res) => {
    try {
        const deletedSolarPanel = await SolarPanel.findByIdAndDelete(req.params.id);
        if (!deletedSolarPanel) {
            return res.status(404).json({ message: 'Solar panel installation request not found' });
        }
        res.status(200).json({ message: 'Solar panel installation request deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
