import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // connect to database using the connection string that we have
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1) // process 1 code means exit with failure, 0 means success
        
    }
}