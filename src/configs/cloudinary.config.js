// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: 'phamtuan19hd',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});