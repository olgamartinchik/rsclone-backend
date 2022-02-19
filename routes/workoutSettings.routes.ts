import { Response, Request } from 'express';
const { Router } = require('express');
const WorkoutSettings = require('../model/WorkoutSettings');
const router = Router();


router.post('/', async (req: Request, res: Response) => {
  
    try {
        const { _id, program } = req.body;

        const workoutSettings = new WorkoutSettings({
            _id,
            program,
        });
        const workoutSettingsId = await WorkoutSettings.findOne({ _id });
        if (workoutSettingsId) {
            return res.status(400).json({ message: 'Workout settings already created' });
        }
        await workoutSettings.save();

        res.status(201).json({ message: 'Settings created', _id, workoutSettings });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});



router.get('/:id', async (req: Request, res: Response) => {
    try {
        const workoutSettings = await WorkoutSettings.findById(req.params.id);
        res.json(workoutSettings);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});


router.patch('/:id', async (req: Request, res: Response) => {
  
    try {
        const { program } = req.body;

        const wsId = req.params.id;
        console.log('wsId', wsId);
        await WorkoutSettings.findByIdAndUpdate(
            { _id: wsId },
            {
                program,
            }
        );
        const updateWS = await WorkoutSettings.findOne({ _id: wsId });
        res.status(201).json({ message: 'Settings update', updateWS });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});



router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const workoutSettings = await WorkoutSettings.findByIdAndRemove({ _id: req.params.id });
        res.send(workoutSettings);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});
module.exports = router;
