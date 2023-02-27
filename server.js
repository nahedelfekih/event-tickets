const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config();
require("dotenv").config({path: "./config/.env"});
const { errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require ("./config/db");


connectDB();
const app = express();

app.use(express.json());



const folder = path.resolve()
app.use('/flyers', express.static(path.join(folder, '/flyers')))

// Serve frontend:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, './', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in on port ${PORT}`.cyan
      .underline
  )
)