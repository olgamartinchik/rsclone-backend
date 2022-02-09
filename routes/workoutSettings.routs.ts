import { Response, Request } from 'express';
const { Router } = require('express');
const WorkoutSettings = require('../model/WorkoutSettings');
const router = Router();

// /api/workoutSettings
router.post('/', async (req: Request, res: Response) => {
    console.log('Body');
    console.log('Body', req.body);
    try {
        const {
            title,
            description,
            equipment,
            type,
            intensity,
            duration,
            caloriesPerMinute,
            link,
            img,
            completed,
            _id,
        } = req.body;

        const workoutSettings = new WorkoutSettings({
            title,
            description,
            equipment,
            type,
            intensity,
            duration,
            caloriesPerMinute,
            link,
            img,
            completed,
            _id,
        });
        const workoutSettingsId = await WorkoutSettings.findOne({ _id });
        if (workoutSettingsId) {
            return res.status(400).json({ message: 'Workout settings already created' });
        }
        await workoutSettings.save();
        const settings = [[workoutSettings]];

        res.status(201).json({ message: 'Settings created', _id, settings });
        // res.send([[workoutSettings]])
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

// /api/workoutSettings/id

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const workoutSettings = await WorkoutSettings.findById(req.params.id);
        res.json([[workoutSettings]]);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

// /api/workoutSettings/id
router.patch('/:id', async (req: Request, res: Response) => {
    console.log('body', req.body);
    try {
        const { title, description, equipment, type, intensity, duration, caloriesPerMinute, link, img, completed } =
            req.body;

        const wsId = req.params.id;
        console.log('wsId', wsId);
        await WorkoutSettings.findByIdAndUpdate(
            { _id: wsId },
            {
                title,
                description,
                equipment,
                type,
                intensity,
                duration,
                caloriesPerMinute,
                link,
                img,
                completed,
            }
        );
        const updateWS = [[await WorkoutSettings.findOne({ _id: wsId })]];
        res.status(201).json({ message: 'Settings update', updateWS });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

// /api/workoutSettings/id

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const workoutSettings = await WorkoutSettings.findByIdAndRemove({_id:req.params.id});
        res.send(workoutSettings);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});
module.exports = router;
