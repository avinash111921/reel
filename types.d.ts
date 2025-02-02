import { Connection } from "mongoose"

declare global {
    //You are extending the global scope (global) with a mongoose object.
    var mongoose : {
        //properties
        conn : Connection | null //Holds the active Mongoose connection or null if not connected.
        promise : Promise<Connection> | null  //Stores the promise resolving to a Mongoose connection or null if not yet initialized.
    };
}

export {};