const jwt = require('jsonwebtoken');
const register = require('../models/register');

const auth = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        const verify_user = jwt.verify(token,'mynameiskashyaprathodandimadeveloper');
        console.log(verify_user);

        const user = await register.findOne({_id:verify_user._id});
        console.log(user.email);

        req.token = token;
        req.user = user;
        
        next();

    } catch (error) {
        res.render('errorpage');
    }
}

module.exports =auth;