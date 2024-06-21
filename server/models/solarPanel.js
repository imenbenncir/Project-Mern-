const mongoose = require('mongoose');

const SolarPanelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    powerNeeded: { type: Number, required: true },
    availableSpace: { type: Number, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SolarPanel', SolarPanelSchema);
