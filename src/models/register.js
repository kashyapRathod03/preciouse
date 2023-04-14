require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    no:{
        type:Number,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

userschema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id},'mynameiskashyaprathodandimadeveloper');
        // console.log("register token part: "+token);
        this.tokens = this.tokens.concat({token});
        await this.save();  
        return token;

    }catch(err){
        res.send(err);
    }
} 

userschema.pre("save", async function(next){
    if(this.isModified("password")){
        // console.log(`this is before bcrypt ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        // console.log(`this is after bcrypt ${this.password}`);
    }
    next();
})

const register = new mongoose.model("Register",userschema);

module.exports = register;