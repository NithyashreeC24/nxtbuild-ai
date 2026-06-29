console.log("JWT.UTILS.JS LOADED");
import jwt from 'jsonwebtoken';


export const generateToken = (user)=>{


const payload={

id:user._id,

email:user.email

};



return jwt.sign(

payload,

process.env.JWT_SECRET,

{

expiresIn:process.env.JWT_EXPIRES_IN

}

);


};



export const verifyToken=(token)=>{


return jwt.verify(

token,

process.env.JWT_SECRET

);

};