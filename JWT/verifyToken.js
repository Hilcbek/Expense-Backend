import jwt from 'jsonwebtoken'
import { ErrorInfo } from '../Errors/Error.js';
export let verifyToken = (req,res,next) => {
    try {
        let token = req.cookies.token;
        if(!token) return next(ErrorInfo(500, 'To create expense tracker please login'))
        jwt.verify(token,process.env.JWT,(err,payload) => {
            if (err) return next(ErrorInfo(500, 'token expired!'))
            req.user = payload;
            next()
        })
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