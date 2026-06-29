import Project from '../models/Project.model.js';

export const saveToHistory = async (projectId, userId, prompt, code) => {

    const project = await Project.findOneAndUpdate(
        {
            _id: projectId,
            userId
        },
        {
            $push: {
                history: {
                    prompt,
                    code
                }
            },
            generatedCode: code,
            prompt
        },
        { new: true }
    );

    return project;
};
export const regenerateProject = async (projectId, userId, prompt, code) => {

const project = await Project.findOneAndUpdate(
{
_id: projectId,
userId
},
{
$push: {
history: {
prompt,
code
}
},
generatedCode: code,
prompt
},
{ new: true }
);

return project;
};