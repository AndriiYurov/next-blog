import mongoose from "mongoose";


const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    mongoose.connect(process.env.NEXT_PUBLIC_DB_URI);
}

export default dbConnect;