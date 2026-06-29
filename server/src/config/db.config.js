import mongoose from 'mongoose';

const connectDB = async () => {
    try {

        console.log("URI loaded:", process.env.MONGODB_URI ? "YES" : "NO");

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB Connected");

    } catch (error) {

        console.log("ERROR NAME:", error.name);
        console.log("ERROR MESSAGE:", error.message);

        process.exit(1);
    }
};

export default connectDB;