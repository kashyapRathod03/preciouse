const mongoose=require('mongoose');

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/signup_form").then(()=>{console.log("connection successfully......")}).catch((err)=>{console.log(err)}); 
