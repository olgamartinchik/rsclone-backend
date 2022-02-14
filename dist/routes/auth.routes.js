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
const fs = require('fs');
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const userConfig = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../model/User');
const authMiddleware = require('../middleware/auth.middleware');
const router = Router();
// /api/auth/register
router.post('/register', 
//массив валидаторов
[
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').isLength({ min: 6 }),
    // .matches(
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
    //   )
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect register data',
            });
        }
        const { userName, email, password } = req.body;
        const candidate = yield User.findOne({ email });
        const candidateName = yield User.findOne({ userName });
        if (candidateName) {
            return res.status(400).json({ message: 'Such username is not free' });
        }
        if (candidate) {
            return res.status(400).json({ message: 'Such user exists' });
        }
        const hashedPassword = yield bcrypt.hash(password, 12);
        const user = new User({ userName, email, password: hashedPassword });
        const token = jwt.sign({ userId: user.id }, userConfig.get('jwtSecret'), {
            expiresIn: '1h',
        });
        yield user.save();
        res.status(201).json({
            message: 'User created',
            token,
            userId: user.id,
            userName: user.userName,
            email: user.email,
            avatar: user.avatar,
        });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
// /api/auth/login
router.post('/login', authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login details',
            });
        }
        const { email, password } = req.body;
        const user = yield User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User is not found' });
        }
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, userConfig.get('jwtSecret'), {
            expiresIn: '1h',
        });
        //по умолчанию статус 200
        res.json({
            token,
            user: {
                userId: user.id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
            }
        });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
/////////////////////////////////////////////////
// /api/auth
// router.get(
//     '/auth',
//     authMiddleware,
//     async (req: Request, res: Response) => {
//         try {
//             const user =await User.findOne({_id:(req as any).user.id})
//             const token = jwt.sign({ userId: user.id }, userConfig.get('jwtSecret'), {
//                 expiresIn: '1h',
//             });
//             res.json({
//                 token,
//                 user:{                
//                 userId: user.id,
//                 userName: user.userName,
//                 email: user.email,
//                 avatar: user.avatar,
//             }});
//         } catch (e) {
//             res.status(500).json({ message: 'Something went wrong, please try again' });
//         }
//     }
// );
////////////////////////////////////////////////////
// /api/auth/users
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.json(users);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
// /api/auth/id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
// /api/auth/id
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName } = req.body;
        const id = req.params.id;
        yield User.findOneAndUpdate({ _id: id }, { userName });
        const updateUserName = yield User.findById(req.params.id);
        res.status(201).json({ message: 'Settings update', updateUserName });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
// /api/auth/id
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByIdAndRemove({ _id: req.params.id });
        res.send(user);
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}));
module.exports = router;
//# sourceMappingURL=auth.routes.js.map