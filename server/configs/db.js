import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {console.log("Database connected successfully")});

        // support both env variable names (MONGO_URI or MONGODB_URI)
        let mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
        const projectName = 'resume-builder';

        if(!mongoURI){
            throw new Error("MONGO_URI or MONGODB_URI environment variable is not set");
        }

        // remove trailing slash if present
        if(mongoURI.endsWith('/')){
            mongoURI = mongoURI.slice(0, -1);
        }

        // If the provided URI does not include a database name (only has scheme + host/credentials), append default DB
        // A simple heuristic: mongodb URIs typically have at least 3 parts when split by '/': ['mongodb+srv:', '', 'user:pass@host'] -> length 3 => no DB
        const parts = mongoURI.split('/');
        let connectString = mongoURI;
        if(parts.length <= 3){
            connectString = `${mongoURI}/${projectName}`;
        }

        await mongoose.connect(connectString);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message || error);
        // rethrow so caller can decide (or exit process) if desired
        throw error;
    }
}

export default connectDB;