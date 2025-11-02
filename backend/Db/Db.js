const mongoose=require("mongoose");

const database=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo is Connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports=database;