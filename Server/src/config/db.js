// here code for connection to database

import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}`);
        console.log(`MongoDB Connection Successful ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log('MongoDB Connection failed', error);
        process.exit(1);
    }

}

export default connectDB