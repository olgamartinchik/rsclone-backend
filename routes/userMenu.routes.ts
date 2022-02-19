import { Response, Request } from 'express';
const { Router } = require('express');
const UserMenu = require('../model/UserMenu');
const router = Router();

router.post('/', async (req: Request, res: Response) =>{
    try{
        const {
            _id,
            periodUserMeal
        }=req.body;
        const userMenu=new UserMenu({_id,
            periodUserMeal})

            const userMenuId= await UserMenu.findOne({_id})
            if(userMenuId){
                return res.status(400).json({ message: 'User menu already created' });
            }
            await userMenu.save()
            res.status(201).json({message: 'User menu created', _id, userMenu })

    }catch(e){
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
})

router.get('/:id', async (req: Request, res: Response) =>{
    try {
        const userMenu = await UserMenu.findById(req.params.id);
        res.json(userMenu);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
})

router.patch('/:id', async (req: Request, res: Response) =>{
    try{
        const {periodUserMeal}= req.body
        const userId = req.params.id;
        console.log('userId',userId)
        await UserMenu.findByIdAndUpdate(
            { _id: userId },
            {
                periodUserMeal,
            }
        );
        const updateUserMenu = await UserMenu.findOne({ _id: userId });
        console.log('updateUserMenu',updateUserMenu)
        res.status(201).json({ message: 'Settings update', updateUserMenu });

    }catch(e){
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userMenu = await UserMenu.findByIdAndRemove({ _id: req.params.id });
        res.send(userMenu);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});
module.exports = router;