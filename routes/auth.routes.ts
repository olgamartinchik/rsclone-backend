import { Response, Request } from 'express';
const fs = require('fs')
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config1 = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../model/User');
const router = Router();
const Uuid=require('uuid')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fileMiddleware=require('../middleware/file')

// /api/auth/register
router.post(
    '/register',
    //массив валидаторов
    [
        check('email', 'Incorrect email').isEmail(),
        check(
            'password',
            'Password must include one lowercase character, one uppercase character, a number, and a special character.'
        ).isLength({ min: 6 }),
        // .matches(
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
        //   )
    ],
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
            const token = jwt.sign({ userId: user.id }, config1.get('jwtSecret'), {
                expiresIn: '1h',
            });
            await user.save();
            res.status(201).json({ message: 'User created', token, userId: user.id, userName:user.userName, email:user.email,avatar:user.avatar });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    }
);

// /api/auth/login
router.post(
    '/login',
    //массив валидаторов
    [check('email', 'Incorrect email').isEmail().normalizeEmail(), check('password', 'Enter password').exists()],
    async (req: Request, res: Response) => {
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

            const token = jwt.sign({ userId: user.id }, config1.get('jwtSecret'), {
                expiresIn: '1h',
            });

            //по умолчанию статус 200
            res.json({
                token,
                userId: user.id,
                userName: user.userName,
                email: email,
                avatar:user.avatar
            });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    }
);

// /api/auth/users
router.get(
    '/users',

    async (req: Request, res: Response) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' });
        }
    }
);
// /api/auth/id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});
// /api/auth/id
router.patch('/:id', async (req: Request, res: Response)=>{
    try{
        const {userName}= req.body;
        const id = req.params.id;
        await User.findOneAndUpdate({_id:id}, {userName})
        const updateUserName = await User.findById(req.params.id);
        res.status(201).json({ message: 'Settings update', updateUserName });
    }catch(e){
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
})

// /api/auth/id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        
        const user = await User.findByIdAndRemove({_id:req.params.id});
        res.send(user)        
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});


// /api/auth/avatar
router.post('/avatar/:id',   async(req: Request, res: Response)=>{
    try {

        const file=(req as any).files.file;
        console.log('wwwww', req.params.id)
        const user = await User.findById((req as any).params.id);
        console.log('user', req.body)
        const avatarName=Uuid.v4()+'.jpg'
        file.mv(config1.get('staticPath')+"\\"+avatarName)
        user.avatar = avatarName
       await user.save()   
       return res.json(user)     
    } catch (e) {
        res.status(500).json({ message: 'Uploaded avatar error', error: e });
    }
})
// /api/auth/avatar
router.delete('/avatar/:id', async(req: Request, res: Response)=>{
    try {      
       const user = await User.findById(req.params.id);
      
    //    fs.unlinksSync(config1.get('staticPath')+"\\"+user.avatar)        
       user.avatar = null
       await user.save()   
       return res.json(user)     
    } catch (e) {
        res.status(500).json({ message: 'Delete avatar error' });
    }
})





module.exports = router;
