// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
try {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB conectado desde Node.js');
} catch (error) {
    console.error(error);
    process.exit(1);
}
};

module.exports = connectDB;
