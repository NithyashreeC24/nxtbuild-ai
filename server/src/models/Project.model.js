import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:'User',
required:false
},

prompt:{
type:String,
default:''
},

generatedCode:{
type:String,
default:''
},

history:[

{

prompt:String,

code:String,

createdAt:{

type:Date,
default:Date.now

}

}

]

},

{

timestamps:true

}

);

const Project = mongoose.model(

'Project',

projectSchema

);

export default Project;