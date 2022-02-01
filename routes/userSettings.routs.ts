import {Response, Request} from 'express'
const { Router } = require("express");
const UserSettings= require('../model/UserSettings')
const router = Router();



// /api/userSettings
router.post(
    "/",
 async (req:Request , res:Response)=>{
    console.log("Body", req.body);
  
    try{
        const { 
            userId,
            startDate,
            goal, 
            weight, 
            height,
            age,
            gender,
            desiredWeight,    
            duration,   
            workoutsNumber,    
            workoutLength:{min,max}, 
            favWorkouts            
        } = req.body;

        const userSettings=new UserSettings({
            userId,
            startDate,
            goal,
            weight,
            height,
            age,
            gender,
            desiredWeight,    
            duration,   
            workoutsNumber,    
            workoutLength:{min,max},
            favWorkouts,
           
         })
            console.log("Body1");
        await userSettings.save()
        console.log("Body2");
        res.status(201).json({ message: "Settings created", userId});
    }catch(e){
        res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
 }

)
// /api/userSettings/userId
router.get(
    "/:userId",
    async (req:Request,res:Response)=>{
        try{
            console.log('req.params.userId', req.params.userId)
            let userSettings= await UserSettings.findOne({userId: req.params.userId})
            console.log('userSettings',userSettings)
            res.json(userSettings)
        }catch(e){
            res.status(500).json({message:'Something went wrong, please try again'})
        }
    }
)

// /api/userSettings/userId
router.patch(
    "/:userId",
 async (req:Request , res:Response)=>{
    console.log("Body", req.body);
  
    try{
        const { 
            startDate,
            goal, 
            weight, 
            height,
            age,
            gender,
            desiredWeight,    
            duration,   
            workoutsNumber,    
            workoutLength:{min,max}, 
            favWorkouts            
        } = req.body;
        const userId = req.params.userId;

        const userSettings= await UserSettings.findOneAndUpdate({userId: userId}, {
            startDate,
            goal,
            weight,
            height,
            age,
            gender,
            desiredWeight,    
            duration,   
            workoutsNumber,    
            workoutLength:{min,max},
            favWorkouts,
        });

     
        console.log("Body2");
        res.status(201).json({message: "Settings update"});
    }catch(e){
        res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
 }

)
module.exports = router;