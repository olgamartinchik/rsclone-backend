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
const bcrypt = require('bcryptjs');
const editConfig = require('config');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = Router();
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, newPassword, avatar } = req.body;
        const user = yield User.findById(req.params.id);
        user.avatar = avatar;
        if (userName) {
            if (user.userName === userName) {
                user.userName = userName;
            }
            else {
                const candidateName = yield User.findOne({ userName });
                if (candidateName) {
                    return res.status(400).json({ message: 'Such username is not free' });
                }
            }
            user.userName = userName;
        }
        if (email) {
            if (user.email === email) {
                user.email = email;
            }
            else {
                const candidate = yield User.findOne({ email });
                if (candidate) {
                    return res.status(400).json({ message: 'Such user exists' });
                }
            }
            user.email = email;
        }
        if (!password && !newPassword) {
            const token = jwt.sign({ userId: user.id }, editConfig.get('jwtSecret'), {
                expiresIn: '1h',
            });
            user.save();
            res.status(201).json({
                message: 'User update',
                token,
                userId: user.id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
            });
        }
        if (password && !newPassword) {
            const isMatch = yield bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password', user });
            }
            else {
                res.status(201).json({ message: 'Passwords match' });
            }
        }
        else if (password && newPassword) {
            const isMatch = yield bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password', user });
            }
            else {
                const hashedPassword = yield bcrypt.hash(newPassword, 12);
                user.newPassword = hashedPassword;
                user.password = hashedPassword;
                const token = jwt.sign({ userId: user.id }, editConfig.get('jwtSecret'), {
                    expiresIn: '1h',
                });
                yield user.save();
                res.status(201).json({
                    message: 'User changed successfully',
                    token,
                    userId: user.id,
                    userName: user.userName,
                    email: user.email,
                    avatar: user.avatar,
                });
            }
        }
        console.log('user', user);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
module.exports = router;
//# sourceMappingURL=editProfile.routes.js.map