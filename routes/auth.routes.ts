import { Response, Request } from 'express';
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const userConfig = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../model/User');

const router = Router();

router.post(
    '/register',
    [check('email', 'Incorrect email').isEmail(), check('password', 'Incorrect password').isLength({ min: 6 })],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect register data',
                });
            }
            const { userName, email, password } = req.body;
            const candidate = await User.findOne({ email });
            const candidateName = await User.findOne({ userName });
            if (candidateName) {
                return res.status(400).json({ message: 'Such username is not free' });
            }
            if (candidate) {
                return res.status(400).json({ message: 'Such user exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({ userName, email, password: hashedPassword });
            const token = jwt.sign({ userId: user.id }, userConfig.get('jwtSecret'), {
                expiresIn: '1h',
            });
            await user.save();
            res.status(201).json({
                message: 'User created',
                token,
                userId: user.id,
                userName: user.userName,
                email: user.email,
            });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    }
);

router.post('/login', async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login details',
            });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User is not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id }, userConfig.get('jwtSecret'), {
            expiresIn: '1h',
        });

        res.json({
            token,
            userId: user.id,
            userName: user.userName,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndRemove({ _id: req.params.id });
        res.send(user);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

module.exports = router;
