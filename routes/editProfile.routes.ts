import { Response, Request } from 'express';
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const editConfig = require('config');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = Router();

// /api/editProfile/id
 router.post('/:id', async (req: Request, res: Response) =>{
    try{
        const {userName, email, password, newPassword, avatar} = req.body;
        const user = await User.findById(req.params.id);
        if(avatar){
            user.avatar=avatar
        }
        
       if(userName){
            if(user.userName===userName){
            user.userName=userName
           
            }else{
                const candidateName = await User.findOne({ userName });
                if (candidateName) {
                return res.status(400).json({ message: 'Such username is not free' });
                 }
            }
        
        user.userName=userName
       }
       if(email){
           if(user.email===email){
               user.email=email
           }else{
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: 'Such user exists' });
            }
           }
           user.email=email
       }        

        if(!password&&!newPassword){
            const token = jwt.sign({ userId: user.id }, editConfig.get('jwtSecret'), {
                expiresIn: '1h',
            });
            user.save()
            res.status(201).json({
                message: 'User update',    
                token,            
                userId: user.id,
                userName: user.userName,
                email: user.email,
                avatar:user.avatar
                
            });
        }
        if(password&&!newPassword){
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return   res.status(400).json({ message: 'Invalid password', user});
               }else{
                res.status(201).json({ message: 'Passwords match' });
               }
        }else if(password&&newPassword){
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
             return   res.status(400).json({ message: 'Invalid password', user});
            }else{
               
                const hashedPassword = await bcrypt.hash(newPassword, 12);
                user.newPassword=hashedPassword
                user.password=hashedPassword

                const token = jwt.sign({ userId: user.id }, editConfig.get('jwtSecret'), {
                    expiresIn: '1h',
                });
                await user.save()
                res.status(201).json({message: 'User changed successfully',
                token,
                userId: user.id,
                userName: user.userName,
                email: user.email,
                avatar:user.avatar
            });
               
            
            }
        }
        console.log('user',user)
        
    }catch(e){
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
 })

 module.exports = router;