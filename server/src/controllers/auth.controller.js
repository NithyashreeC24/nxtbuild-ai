console.log("AUTH.CONTROLLER.JS LOADED");
import * as authService from '../services/auth.service.js';



export const registerUser = async(req,res,next)=>{


try{


const{

name,
email,
password

}=req.body;



if(!name || !email || !password){

return res.status(400).json({

success:false,

message:"All fields required"

});

}



const result = await authService.register(

name,

email,

password

);



res.status(201).json({

success:true,

data:result

});


}

catch(error){

next(error);

}


};





export const loginUser = async(req,res,next)=>{


try{


const{

email,
password

}=req.body;



const result = await authService.emailLogin(

email,

password

);



res.json({

success:true,

data:result

});


}


catch(error){

next(error);

}



};






export const getMe = async(req,res,next)=>{


try{


const user = await authService.getUserProfile(

req.user.id

);



res.json({

success:true,

data:user

});


}

catch(error){

next(error);

}



};






export const logout = async(req,res)=>{


res.json({

success:true,

message:"Logged out"

});


};