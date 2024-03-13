const express = require('express');
const mongoose = require('mongoose');
const posaoRoute = require('./routes/posaoRoute');
const galerijaRoute = require('./routes/galerijaRoute');
const authRoute = require('./routes/authRoute');
require('dotenv').config();
const PORT = 5000;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/posao', posaoRoute);
app.use('/auth', authRoute);
app.use('/galerija', galerijaRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to DB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.listen(PORT, () => {
  console.log('Server running on ' + PORT);
});
