import mongoose from "mongoose";

const schema = new mongoose.Schema({
    category:{
        type:String,
        required:[true,"Category is required."]
    }
 });

export const Category = mongoose.model("Category", schema);