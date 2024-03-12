const express = require('express');
const mongoose = require('mongoose')
const posaoRoute = require('./routes/posaoRoute')
const galerijaRoute = require('./routes/galerijaRoute')
const authRoute = require('./routes/authRoute')
require('dotenv').config()
const multer = require('multer');
const upload = multer();
const PORT = 5000;
const cors = require('cors')

const app = express()

app.use(cors())
app.use('/posao', posaoRoute);
app.use('/auth', authRoute)
app.use('/galerija', galerijaRoute)
app.use(upload.any()); 
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Successfully connected to DB");
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
app.listen(PORT, () => {
    console.log("server running on " + PORT)
})
