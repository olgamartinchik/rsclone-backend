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
const UserMenu = require('../model/UserMenu');
const router = Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, periodUserMeal } = req.body;
        const userMenu = new UserMenu({ _id, periodUserMeal });
        const userMenuId = yield UserMenu.findOne({ _id });
        if (userMenuId) {
            return res.status(400).json({ message: 'User menu already created' });
        }
        yield userMenu.save();
        res.status(201).json({ message: 'User menu created', _id, userMenu });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userMenu = yield UserMenu.findById(req.params.id);
        res.json(userMenu);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { periodUserMeal } = req.body;
        const userId = req.params.id;
        console.log('userId', userId);
        yield UserMenu.findByIdAndUpdate({ _id: userId }, {
            periodUserMeal,
        });
        const updateUserMenu = yield UserMenu.findOne({ _id: userId });
        console.log('updateUserMenu', updateUserMenu);
        res.status(201).json({ message: 'Settings update', updateUserMenu });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userMenu = yield UserMenu.findByIdAndRemove({ _id: req.params.id });
        res.send(userMenu);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
module.exports = router;
//# sourceMappingURL=userMenu.routes.js.map