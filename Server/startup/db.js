import mongoose from "mongoose";
import 'dotenv/config';

const db = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then(() => console.log(`Connected to mongodb...`))
        .catch(() => console.error(ex));
};

export default db;