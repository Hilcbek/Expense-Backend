import { ErrorInfo } from '../Errors/Error.js';
import User from '../model/User.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export let Register = async (req,res,next) => {
    try {
        let genSalt = await bcrypt.genSalt(10);
        let {username,email,profile,hint} = req.body;
        if(!username || !email || !req.body.password || !profile || !hint) return next(ErrorInfo((500,'please provide the inputs')))
        let Username = await User.findOne({username : username});
        if(Username) return next(ErrorInfo(500,'username taken'))
        let Email = await User.findOne({email : email});
        if(Email) return next(ErrorInfo(500,'email already exist'))
        let NewUser = await User.create({
            ...req.body,
            password : await bcrypt.hash(req.body.password,genSalt)

        });
        let {password,...Data} = NewUser._doc;
        res.status(200).json(Data);
    } catch (error) {
        next(error)
    }
}
export let Login = async (req,res,next) => {
    try {
        let {username} = req.body;
        if(!username || !req.body.password) return next(ErrorInfo(500,'please provide the inputs'));
        let Username = await User.findOne({username : username});
        if(!Username) return next(ErrorInfo(500, 'wrong username'))
        let Password = await bcrypt.compare(req.body.password,Username.password);
        if(!Password) return next(ErrorInfo(500),'wrong username or password');
        let {password,...Info} = Username._doc;
        let token = jwt.sign({
            username : Info.username,
            isAdmin : Info.isAdmin
        },process.env.JWT,{expiresIn : '2h'});
        res.cookie('token',token,{ secure : true ,sameSite : 'Strict', httpOnly: false, domain : 'onrender.com' }).status(200).json(Info);
    } catch (error) {
        next(error)
    }
}