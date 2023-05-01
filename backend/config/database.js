const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pet_store';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;

