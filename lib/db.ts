import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; //! -> 100% yahe milega 

if(!MONGODB_URI){
    throw new Error("Please Define monoDb uri in ENV File");
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
            bufferCommands : true, //?
            maxPooSize : 10 //kitna connection ho skta hai mongoDb sai ekBaar mai
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