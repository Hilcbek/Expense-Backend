import jwt from 'jsonwebtoken'
import { ErrorInfo } from '../Errors/Error.js';
export let verifyToken = (req,res,next) => {
    try {
        let { token } = req.cookies;
        if(token){
            jwt.verify(token,process.env.JWT,(err,payload) => {
                if (err) return next(ErrorInfo(500, 'token expired!'))
                req.user = payload;
                next()
            })
        }else{
        return next(ErrorInfo(500, 'Unauthorized!'))
    }
    } catch (error) {
        next(error)
    }
}
export let verifyAdmin = (req,res,next) => {
   try {
        verifyToken(req,res,() => {
            if(!req.user.isAdmin) return next(ErrorInfo(500, 'Admin privillage only!'))
            next()
        })
   } catch (error) {
        next(error)
   }
}