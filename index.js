const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
// app.options("*",cors())

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:5173",
          "https://deshbd.netlify.app"
        ];
    
        if (!origin || origin === "null" || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true  
}))



const server = async() => {
    db()
    app.listen(port, () => {
        console.log(`app is running at http://localhost:${port}`);
    });
};
server(); 