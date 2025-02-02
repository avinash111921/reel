import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; //! -> 100% yahe milega 

if(!MONGODB_URI){
    throw new Error("Please Define MongoDB_URI in ENV File");
}

//global -> variable 
let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn : null,promise : null}
}

export async function connectToDatabase(){

    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const option = {
            bufferCommands : true, 
            //This option enables buffering of Mongoose commands when the connection to MongoDB is not yet established.
            // If true, operations like .find() or .save() will be queued until the connection is ready.
            // If false, commands will fail immediately if the connection is not ready.
            maxPoolSize : 10 // Defines the maximum number of connections in the pool
        }
        cached.promise = mongoose
        .connect(MONGODB_URI,option)
        .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn;
}