const admin = require("firebase-admin");

// Inisialisasi Firestore
admin.initializeApp();

const db = admin.firestore();

module.exports = db;
