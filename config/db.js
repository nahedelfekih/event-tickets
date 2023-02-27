const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const conn =  await mongoose.set("strictQuery", false).connect(process.env.MONGO_URI);
    console.log(`MongoDB connected on ${conn.connection.host}`.yellow.bold)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB;
