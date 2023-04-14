require("dotenv").config();

const express= require("express");
const app = express();
const path =require("path");
const hbs=require("hbs");
require('./db/conn');
const register = require("./models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");
const cookieParser = require("cookie-parser");
const auth = require('./middleware/auth');
// let alert = require('alert');
app.use( express.static(path.join(__dirname, '../public')));

// const staticpath = path.join(__dirname,"/public");
// app.use(express.static(staticpath));
// app.use(express.static("views/images"));

// this is for changing name of views directory
const templetepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


// set view engine ......................
app.set("view engine","hbs");
app.set("views",templetepath);
hbs.registerPartials(partialpath);

// this is dotenv...................................................
console.log(process.env.SECRET_KEY);

// templete engine route
app.get("/", (req,res)=>{
    res.render("homepage");
});
app.get("/homepage", (req,res)=>{
    res.render("homepage");
});

app.get("/men", (req,res)=>{
    // console.log(req.cookies.jwt);
    res.render("men");
});

app.get("/women", (req,res)=>{
    res.render("women");
});

app.get("/slide_login_signup", (req,res)=>{
    res.render("slide_login_signup");
});

app.get("/logout",auth,async(req,res)=>{
    try {
        console.log(req.user);
        
        req.user.tokens = req.user.tokens.filter((cre)=>{
            return cre.token !== req.token;
        })
        res.clearCookie('jwt');
        console.log("logout successfully.........");

        await req.user.save();
        // alert("Successfully logout........" );

        res.render('slide_login_signup');
    } catch (error) {
        res.render("errorpage2");
    }
})


app.get("/login", (req,res)=>{
    res.render("slide_login_signup");
});
app.post("/login",async(req,res)=>{
    try{

       
            const email=req.body.email;
            // no=req.body.no,
            const password=req.body.password;
    
        console.log(req.body.email);
        console.log(req.body.password);
        
        const user = await register.findOne({email:email});

        // this is password security ...............................................
        const istrue = await bcrypt.compare(password,user.password);

        // for generating tokens.................................................................................................
        const token = await user.generateAuthToken();
        // console.log("token part: "+token);
        res.cookie("jwt",token,{
            httpOnly : true,
            expires:new Date(Date.now() + 70000),
            // secure:true
        });


        if(istrue){
            res.status(201).render("homepage");

            // alert("Successsully login !!! " ); 

            // res.status(201).render("homepage",{
            //     // 'user' : user
            //     'user':true
            // }); 
        }
        else{
            res.render("errorpage");
        }

    }
    catch(err){
        res.status(400).render("errorpage");
    }
} )

app.get("/signup", (req,res)=>{
    res.render("slide_login_signup");
});
app.post("/signup",async(req,res)=>{
    try{

        const newuser = new register({
            email:req.body.email,
            no:req.body.no,
            password:req.body.password
        })
        console.log(newuser);
        
        // middleware tokens ................................................................
        const token = await newuser.generateAuthToken();
        console.log("main index token part: "+token);

        res.cookie("jwt",token,{
            httpOnly : true,
            expires:new Date(Date.now() + 70000)
        });

        const signup = await newuser.save();
        res.status(201).render("homepage"); 

    }
    catch(err){
        res.status(400).render("errorpage2");
    }
} );


// secure("thapa@123");
app.listen(8000,()=>{
    console.log("port 8000: ");
});
// const secure = async(password)=>{
    //     const passwordhash = await bcrypt.hash(password,10);
    //     console.log(passwordhash);
    
    //     const passwordmatch = await bcrypt.compare(password,passwordhash);
    //     console.log(passwordmatch);
    // }


    // const jwt = require("jsonwebtoken");
    
    // const createtoken = async()=>{
    //     const token = await jwt.sign({_id:"63d0c08b29b20dc7d609928d"},"mynameiskashyaprathodandimadeveloper",{
    //         expiresIn:"2 seconds"
    //     });
    //     console.log(token);
    
    //     const uservar = await jwt.verify(token,"mynameiskashyaprathodandimadeveloper");
    //     console.log(uservar); 
    // }
    // createtoken();

