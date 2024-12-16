import mongoose from "mongoose";

const db = async ()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/todouser");
        console.log("database is connected successfully");
    } catch (error) {
        console.log(error,"something went wrong in database");
    }
}

export default db;