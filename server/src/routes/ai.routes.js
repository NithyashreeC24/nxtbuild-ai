console.log("AI.ROUTES LOADED");

import { Router } from 'express';
import { generateAI } from '../controllers/ai.controller.js';

const router = Router();

router.get('/', (req,res)=>{
    res.json({
        message:"AI Routes Working"
    });
});

router.post(
'/generate',
generateAI
);

export default router;