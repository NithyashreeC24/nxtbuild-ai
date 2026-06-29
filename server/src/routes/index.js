console.log("INDEX ROUTES LOADED");

import { Router } from 'express';
import authRoutes from './auth.routes.js';
import projectRoutes from './project.routes.js';
import aiRoutes from './ai.routes.js';
console.log("AIROUTES =", aiRoutes);
console.log(projectRoutes);
console.log("AUTHROUTES", authRoutes);

const router = Router();

router.get('/', (req,res)=>{
    res.json({
        message:"NxtBuild API"
    });
});


router.use('/auth',authRoutes);
router.use(
    '/projects',
    projectRoutes
);
router.use(

'/ai',

aiRoutes

);
router.get('/xyz',(req,res)=>{

res.json({

ok:true

});

});


export default router;