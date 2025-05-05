require('dotenv').config();
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express(); 
const web = require("./routes/web")
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cookieParser());
app.use(cors({origin: CLIENT_URL, credentials: true}));
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(web);

app.listen(PORT, ()=> {
    console.log(`Le serveur écoute bien sur le port ${PORT}.`)
    connectDB();
})