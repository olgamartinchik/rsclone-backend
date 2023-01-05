"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const UserSettings = require('../model/UserSettings');
const router = Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, photo, startDate, goal, weight, height, age, gender, desiredWeight, duration, workoutsNumber, favWorkouts, caloriesBurned, badges, heightUnit, weightUnit, completedWorkouts, weekProgress, liked, progress, birthday, } = req.body;
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
            progress,
            birthday,
        });
        yield userSettings.save();
        res.status(201).json({ message: 'Settings created', userId });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userSettings = yield UserSettings.findOne({ userId: req.params.userId });
        res.json(userSettings);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
router.patch('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { photo, startDate, goal, weight, height, age, gender, desiredWeight, duration, workoutsNumber, favWorkouts, caloriesBurned, badges, heightUnit, weightUnit, completedWorkouts, weekProgress, liked, progress, birthday, } = req.body;
        const userId = req.params.userId;
        yield UserSettings.findOneAndUpdate({ userId: userId }, {
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
            progress,
            birthday,
        });
        const updateUserSettings = yield UserSettings.findOne({ userId: userId });
        res.status(201).json({ message: 'Settings update', updateUserSettings });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
router.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userSettings = yield UserSettings.findOneAndDelete({ userId: req.params.userId });
        res.send(userSettings);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
//
module.exports = router;
//# sourceMappingURL=userSettings.routes.js.map