import mongoose from "mongoose";

export const connectDB = async()=>{
  try{
    const {connection} = await mongoose.connect(process.env.MONGO_URL,{
      dbName:"MRProjekat",
    });


    console.log("Server connected to database.");

  } catch(error){
    console.log("Error occurred",error);
    process.exit(1);
  }
}