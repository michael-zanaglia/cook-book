require('dotenv').config();
const connectDB = require("./utils/connectDB");
const express = require("express");
const app = express(); 
const web = require("./routes/web")
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(web);

app.listen(PORT, ()=> {
    console.log(`Le serveur écoute bien sur le port ${PORT}.`)
    connectDB();
})