import { Response, Request } from 'express';
const { Router } = require('express');
const UserSettings = require('../model/UserSettings');
const router = Router();

// /api/userSettings
router.post('/', async (req: Request, res: Response) => {
    try {
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
            workoutLength: { min, max },
            favWorkouts,
        } = req.body;

        const userSettings = new UserSettings({
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
            workoutLength: { min, max },
            favWorkouts,
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
            startDate,
            goal,
            weight,
            height,
            age,
            gender,
            desiredWeight,
            duration,
            workoutsNumber,
            workoutLength: { min, max },
            favWorkouts,
        } = req.body;
        const userId = req.params.userId;

        await UserSettings.findOneAndUpdate(
            { userId: userId },
            {
                startDate,
                goal,
                weight,
                height,
                age,
                gender,
                desiredWeight,
                duration,
                workoutsNumber,
                workoutLength: { min, max },
                favWorkouts,
            }
        );
        const updateUserSettings = await UserSettings.findOne({ userId: userId });
        res.status(201).json({ message: 'Settings update', updateUserSettings });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});
module.exports = router;
