import { Response, Request } from 'express';
const { Router } = require('express');
const fs = require('fs');
const router = Router();
const User = require('../model/User');
const avatarConfig = require('config');
const Uuid = require('uuid');

// /api/auth/avatar
router.post('/avatar/:id', async (req: Request, res: Response) => {
    try {
        const file = (req as any).files.file;        
        const user = await User.findById((req as any).params.id);
        // const user = await User.findById((req as any).user.id);       
        const avatarName = Uuid.v4() + '.jpg';
        file.mv(avatarConfig.get('staticPath') + '\\' + avatarName);
        user.avatar = avatarName;
        await user.save();
        return res.json({avatar:user.avatar});
    } catch (e) {
        
        res.status(500).json({ message: 'Uploaded avatar error', error: e });
    }
});
// /api/auth/avatar
router.delete('/avatar/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        // const user = await User.findById((req as any).user.id);
        
        await  fs.unlink((avatarConfig.get('staticPath')+"\\"+user.avatar), err => {
        if(err) throw err; 
        console.log('File deleted');
     })      
        user.avatar = null;
        await user.save();
        res.sendFile(avatarConfig.get('staticPath')+"\\"+user.avatar);
        return res.json({avatar:user.avatar});
    } catch (e) {
       
        res.status(500).json({ message: 'Delete avatar error',error: e });
    }
});
router.get('/avatar/:id', async (req: Request, res: Response)=>{
    try{
        const user = await User.findById(req.params.id);
        if(user.avatar){
            res.sendFile(avatarConfig.get('staticPath')+"\\"+user.avatar);
        }else{
            console.log('Avatar not found')
        }
         
    }catch(e){
        res.status(500).json({ message: 'Something went wrong, please try again',error: e });
    }
    
})
module.exports = router;