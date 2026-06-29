console.log("PROJECT.CONTROLLER LOADED");
import * as projectService from '../services/project.service.js';


console.log(projectService);
export const createProject = async(req,res,next)=>{

try{

const { title } = req.body;

const project = await projectService.createProject(

title,

null

);

res.status(201).json({

success:true,

data:project

});

}

catch(error){

console.log(error);

next(error);

}

};


export const getProjects = async(req,res,next)=>{


try{


console.log("GET PROJECTS HIT");


const projects = await projectService.getProjects();


console.log(projects);


res.json({

success:true,

data:projects

});


}


catch(error){

next(error);

}


};
export const getProjectById = async(req,res,next)=>{};

export const deleteProject = async(req,res,next)=>{

try{

console.log("DELETE HIT");
console.log(req.params.id);

await projectService.deleteProject(

req.params.id

);

console.log("DELETED");

res.json({

success:true

});

}

catch(error){

console.log(error);

next(error);

}

};

export const saveProject = async(req,res,next)=>{

try{

console.log("SAVE HIT");
console.log(req.body);

const {

projectId,
prompt,
generatedCode

}=req.body;

const project =
await projectService.saveGeneratedProject(

projectId,
prompt,
generatedCode

);

res.json({

success:true,
data:project

});

}

catch(error){

console.log(error);

next(error);

}

};

export const updateProject = async(req,res,next)=>{

try{

console.log("UPDATE HIT");

console.log("ID :",req.params.id);

console.log("BODY :",req.body);

const project = await projectService.renameProject(

req.params.id,

req.body.title

);

console.log("UPDATED PROJECT");

console.log(project);

res.json({

success:true,

data:project

});

}

catch(error){

console.log("UPDATE ERROR");

console.log(error);

next(error);

}

};