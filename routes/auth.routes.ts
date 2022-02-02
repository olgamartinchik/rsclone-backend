import {Response, Request} from 'express'

const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config1 = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const router = Router();




// /api/auth/register
router.post(
  "/register",
  //массив валидаторов
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    ).isLength({ min: 6 }),
    // .matches(
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
    //   )
  ],
  async (req:Request , res:Response) => {
    console.log("Body", req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect register data",
        });
      }

      const { userName, email, password } = req.body;
      const candidate = await User.findOne({ email });
      const candidateName = await User.findOne({ userName });
      if (candidateName) {
        return res.status(400).json({ message: "Such username is not free" });
      }
      if (candidate) {
        return res.status(400).json({ message: "Such user exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      //
      const user = new User({ userName, email, password: hashedPassword });
      const token = jwt.sign({ userId: user.id }, config1.get("jwtSecret"), {
        expiresIn: "1h",
      });
      await user.save();
      res.status(201).json({ message: "User created", token,userId: user.id, });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  //массив валидаторов
  [
    check("email", "Incorrect email").isEmail().normalizeEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req:Request, res:Response) => {
    console.log("Body", req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login details",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User is not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ userId: user.id }, config1.get("jwtSecret"), {
        expiresIn: "1h",
      });

      //по умолчанию статус 200
      res.json({
        token,
        userId: user.id,
        userName: user.userName,
        email: email,
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);

// /api/auth/users
router.get(
  "/users",

async (req:Request, res:Response)=>{
 try{
  let users= await User.find()
  res.json(users)
 }catch(e){
  res.status(500).json({message:'Something went wrong, please try again'})
 }
}
)
// /api/auth/id
router.get(
  "/:id",
  async(req:Request,res:Response)=>{
    try{
      let user= await User.findById(req.params.id)
      res.json(user)
     }catch(e){
      res.status(500).json({message:'Something went wrong, please try again'})
     }
  }
)
module.exports = router;
