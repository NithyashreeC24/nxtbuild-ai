console.log("AUTH.SERVICE.JS LOADED");
import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import { generateToken } from '../utils/jwt.utils.js';



export const register = async (name,email,password)=>{


const existingUser = await User.findOne({email});


if(existingUser){

const error = new Error("Email already registered");

error.statusCode=409;

throw error;

}



const hashedPassword = await bcrypt.hash(password,10);



const user = await User.create({

name,

email,

password:hashedPassword

});



const token = generateToken(user);



const userResponse = {

id:user._id,

name:user.name,

email:user.email

};


return{

user:userResponse,

token

};

};




export const emailLogin = async(email,password)=>{


const user = await User.findOne({email});


if(!user){

const error = new Error("Invalid Credentials");

error.statusCode=401;

throw error;

}



const isMatch = await bcrypt.compare(

password,

user.password

);



if(!isMatch){

const error = new Error("Invalid Credentials");

error.statusCode=401;

throw error;

}



user.lastLogin = new Date();

await user.save();



const token = generateToken(user);



return{

user,

token

};

};




export const getUserProfile = async(userId)=>{


const user = await User.findById(userId)

.select('-password');



return user;


};