import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
name:{
  type:String,
  required:[true,"Name is required."]
},
email:{
  type:String,
  required:[true,"Email is required."],
  unique:[true,"User with this email already exist."],
  validate:validator.isEmail,
},
password:{
  type:String,
  required:[true,"Password is required."],
  minLength:[6,"Password must be at least 6 character long."],
  select: false
},
address:{
  type:String,
  required:[true,"Address is required."],
},
city:{
  type:String,
  required:[true,"City is required."],
},
country:{
  type:String,
  required:[true,"Country is required."],
},
pinCode: {
  type:Number,
  required:[true,"Pincode is required."],
},
role:{
  type:String,
  enum:["admin","user"],
  default:"user"
},
avatar:{
  public_id:String,
  url:String
},
otp:Number,
otp_expire: Date
});

// Kao neki pre-method, pozivace se svaki put pre cuvanja usera u bazu
// Tu cemo zapravo hashovaati password pomocu bcrypt-a
schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
})

schema.methods.comparePassword = async function (enteredPass){
  return await bcrypt.compare(enteredPass, this.password);
}

export const User = mongoose.model("User", schema);