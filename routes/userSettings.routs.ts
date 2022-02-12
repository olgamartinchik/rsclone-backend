import { Response, Request } from 'express';
const { Router } = require('express');
const UserSettings = require('../model/UserSettings');
const router = Router();

// /api/userSettings
router.post('/', async (req: Request, res: Response) => {
    try {
        const {
            userId,
            photo,
            startDate,
            goal,
            weight,
            height,
            age,
            gender,
            desiredWeight,
            duration,
            workoutsNumber,
            favWorkouts,
            caloriesBurned,
            badges,
            heightUnit,
            weightUnit,
            completedWorkouts,
            weekProgress,
            liked,
            progress
        } = req.body;

        const userSettings = new UserSettings({
            userId,
            photo,
            startDate,
            goal,
            weight,
            height,
            age,
            gender,
            desiredWeight,
            duration,
            workoutsNumber,
            favWorkouts,
            caloriesBurned,
            badges,
            heightUnit,
            weightUnit,
            completedWorkouts,
            weekProgress,
            liked,
            progress
        });

        await userSettings.save();

        res.status(201).json({ message: 'Settings created', userId });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});
// /api/userSettings/userId
router.get('/:userId', async (req: Request, res: Response) => {
    try {
        const userSettings = await UserSettings.findOne({ userId: req.params.userId });

        res.json(userSettings);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

// /api/userSettings/userId
router.patch('/:userId', async (req: Request, res: Response) => {
    try {
        const {
            photo,
            startDate,
            goal,
            weight,
            height,
            age,
            gender,
            desiredWeight,
            duration,
            workoutsNumber,            
            favWorkouts,
            caloriesBurned,
            badges,
            heightUnit,
            weightUnit,           
            completedWorkouts,
            weekProgress,
            liked,
            progress
        } = req.body;
        const userId = req.params.userId;

        await UserSettings.findOneAndUpdate(
            { userId: userId },
            {
                photo,
                startDate,
                goal,
                weight,
                height,
                age,
                gender,
                desiredWeight,
                duration,
                workoutsNumber,                
                favWorkouts,
                caloriesBurned,
                badges,
                heightUnit,
                weightUnit, 
                completedWorkouts,
                weekProgress,
                liked,
                progress
            }
        );
        const updateUserSettings = await UserSettings.findOne({ userId: userId });
        res.status(201).json({ message: 'Settings update', updateUserSettings });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

// /api/userSettings/userId
router.delete('/:userId', async (req: Request, res: Response) => {
    try {
        const userSettings = await UserSettings.findOneAndDelete({ userId: req.params.userId });

        res.send(userSettings);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

// const  uploadAvatar=async(req: Request, res: Response)=>{
// try{
//     const file=req.files.file
//     const user =  await UserSettings.findOne({ userId: userId });

// }catch(e){
//     res.status(500).json({ message: 'Something went wrong, please try again' });
// }
// }

module.exports = router;
