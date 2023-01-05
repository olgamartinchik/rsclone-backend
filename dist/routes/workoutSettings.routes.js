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
const WorkoutSettings = require('../model/WorkoutSettings');
const router = Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, program } = req.body;
        const workoutSettings = new WorkoutSettings({
            _id,
            program,
        });
        const workoutSettingsId = yield WorkoutSettings.findOne({ _id });
        if (workoutSettingsId) {
            return res.status(400).json({ message: 'Workout settings already created' });
        }
        yield workoutSettings.save();
        res.status(201).json({ message: 'Settings created', _id, workoutSettings });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workoutSettings = yield WorkoutSettings.findById(req.params.id);
        res.json(workoutSettings);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { program } = req.body;
        const wsId = req.params.id;
        console.log('wsId', wsId);
        yield WorkoutSettings.findByIdAndUpdate({ _id: wsId }, {
            program,
        });
        const updateWS = yield WorkoutSettings.findOne({ _id: wsId });
        res.status(201).json({ message: 'Settings update', updateWS });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workoutSettings = yield WorkoutSettings.findByIdAndRemove({ _id: req.params.id });
        res.send(workoutSettings);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
module.exports = router;
//# sourceMappingURL=workoutSettings.routes.js.map