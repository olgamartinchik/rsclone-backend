import { Response, Request } from 'express';
const { Router } = require('express');
const fs = require('fs');
const router = Router();
const User = require('../model/User');
const avatarConfig = require('config');
const Uuid = require('uuid');
const cors = require('cors');
import { corsOptions } from '../src/app';

router.post('/avatar/:id', cors(corsOptions), async (req: Request, res: Response) => {
    try {
        const file = (req as any).files.file;
        const user = await User.findById((req as any).params.id);
        const avatarName = Uuid.v4() + '.jpg';
        file.mv(avatarConfig.get('staticPath') + '\\' + avatarName);
        user.avatar = avatarName;
        await user.save();
        return res.json({ avatar: user.avatar });
    } catch (e) {
        res.status(500).json({ message: 'Uploaded avatar error', error: e });
    }
});

router.delete('/avatar/:id', cors(corsOptions), async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        await fs.unlink(avatarConfig.get('staticPath') + '\\' + user.avatar, (err) => {
            if (err) throw err;
            console.log('File deleted');
        });
        user.avatar = null;
        await user.save();

        return res.json({ avatar: user.avatar });
    } catch (e) {
        res.status(500).json({ message: 'Delete avatar error', error: e });
    }
});

router.get('/avatar/:id', cors(corsOptions), async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (user.avatar) {
            res.sendFile(avatarConfig.get('staticPath') + '\\' + user.avatar);
        } else {
            console.log('Avatar not found');
        }
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again', error: e });
    }
});
module.exports = router;
