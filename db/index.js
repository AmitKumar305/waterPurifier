const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log('Database connected');
    } catch (err) {
        console.log('Mongodb connection FAILED', err);
        process.exit(1);
    }
}

module.exports = connectDB;
