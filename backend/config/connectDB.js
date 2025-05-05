const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
async function connectDB() {
    try {
      await mongoose.connect(MONGO_URL);
      console.log("Connecté à MongoDB !");
    } catch (error) {
      console.error("Erreur de connexion à MongoDB :", error.message);
      process.exit(1); // Quitter si la connexion échoue
    }
}

module.exports = connectDB;