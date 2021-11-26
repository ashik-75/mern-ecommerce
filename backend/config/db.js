const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.mongo_uri);
        console.log("connection successfull ",conn.connection.name)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB