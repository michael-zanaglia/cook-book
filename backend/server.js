require('dotenv').config();
const connectDB = require("./utils/connectDB");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express(); 
const web = require("./routes/web")
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(express.json())
app.use(web);

app.listen(PORT, ()=> {
    console.log(`Le serveur écoute bien sur le port ${PORT}.`)
    connectDB();
})