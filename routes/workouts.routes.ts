import { Response, Request } from 'express';
const { Router } = require('express');
const Workouts = require('../model/Workouts');
const router = Router();


router.get(
    '/',

    async (req: Request, res: Response) => {
        try {
            const workouts = await Workouts.find();
            res.json(workouts);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    }
);

module.exports = router;
