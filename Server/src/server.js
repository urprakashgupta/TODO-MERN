import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js'

const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on Port ${PORT}`);

    })
}).catch(() => {
    console.log('Not able to run the port please check and try again !');

})