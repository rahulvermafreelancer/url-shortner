require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log("Server is connected to the database!");
    }
    catch (e) {
        console.error(e.message);

        // stop program execution forcefully
        process.exit(1);
    }
}

module.exports = connectDB;
