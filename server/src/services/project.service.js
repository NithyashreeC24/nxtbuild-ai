console.log("PROJECT.SERVICE LOADED");
import Project from '../models/Project.model.js';


export const createProject = async (title, userId) => {

    const project = await Project.create({

        title,

        userId

    });

    return project;

};



export const getProjects = async()=>{


const projects = await Project.find()

.sort({

updatedAt:-1

});


return projects;

};



export const getProjectById = async(projectId,userId)=>{

    const project = await Project.findOne({

        _id:projectId,

        userId

    });

    return project;

};



export const saveGeneratedProject = async(

projectId,
prompt,
generatedCode

)=>{

console.log("SERVICE SAVE");

console.log("Project ID:",projectId);
console.log("Prompt:",prompt);
console.log("Code Length:",generatedCode?.length);

const project = await Project.findByIdAndUpdate(

projectId,

{
prompt,
generatedCode,

$push:{
history:{
prompt,
code:generatedCode
}
},

updatedAt:new Date()

},

{
returnDocument:"after"
}

);

if(!project){

throw new Error("Project not found");

}


return project;

};



export const deleteProject = async(projectId)=>{

await Project.findByIdAndDelete(projectId);

};


export const renameProject = async(id,title)=>{

console.log("SERVICE RENAME");

console.log(id);
console.log(title);


const project = await Project.findByIdAndUpdate(

id,

{

title:title

},

{

new:true

}

);


console.log("UPDATED FROM DB");

console.log(project);


return project;

};
