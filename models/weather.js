const mongoose = require("mongoose");
const weatherSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    temperature: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    humidity: {
        type: String,
        required: true,
    },
    pressure: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        required: true,
    },
    windSpeed: {
        type: String,
        required: true,
    },
    sunrise: {
        type: String,
        required: true,
    },
    sunset: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Weather", weatherSchema);