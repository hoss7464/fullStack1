// Core/mongoDB.js - Simplified
import mongoose from "mongoose";

class MongoDB {
    static db = null;
    
    static async connect(URI) {
        try {
            await mongoose.connect(URI);
            this.db = mongoose.connection;
            return true;
        } catch (e) {
            console.error(`MongoDB Error: ${e.toString()}`);
            return false;
        }
    }
    
    static get connection() {
        return this.db;
    }
}

export default MongoDB;