const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require("./config/db")
const authRoutes = require('./routes/authRoutes')
const activityRoutes = require('./routes/activityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// App init
const app = express();

// load env variable
dotenv.config();

// connect to mongodb
connectDB();

// middlewares
app.use(cors())
app.use(express.json())
app.use('/api/activities', activityRoutes);
app.use('/api/activities', bookingRoutes);  // Mount booking routes

//Routes placeholder

app.use('/api/auth', authRoutes);


app.get("/",(req,res)=>{
    res.status(200).send("<h2> Api is running  </h2>")
})

//start server
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});