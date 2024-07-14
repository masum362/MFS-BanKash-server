import mongoose from "mongoose";

const connection =async(url) => {
    try {
        await mongoose.connect(url);
        console.log('database connection established');
    } catch (error) {
        console.log(error.message);
    }
}


export default connection