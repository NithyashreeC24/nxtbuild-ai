import { Router } from 'express';

import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    saveProject
} from '../controllers/project.controller.js';

import authenticate from '../middleware/auth.middleware.js';

const router = Router();

router.post(
    '/',
    
    createProject
);

router.get(

'/',

(req,res,next)=>{

console.log("PUBLIC GET PROJECTS");

next();

},

getProjects

);
router.put(
    '/save',
    
    saveProject
);

router.get(
    '/:id',
    
    getProjectById
);

router.put(
'/:id',

(req,res,next)=>{

console.log("PUT ROUTE HIT");
console.log(req.params.id);

next();

},

updateProject

);

router.delete(
    '/:id',
    
    deleteProject
);

export default router;