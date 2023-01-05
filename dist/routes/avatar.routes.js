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
const fs = require('fs');
const router = Router();
const User = require('../model/User');
const avatarConfig = require('config');
const Uuid = require('uuid');
const cors = require('cors');
const app_1 = require("../src/app");
router.post('/avatar/:id', cors(app_1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = Object.assign(req.files).file;
        const user = yield User.findById(req.params.id);
        const avatarName = Uuid.v4() + '.jpg';
        file.mv(avatarConfig.get('staticPath') + '\\' + avatarName);
        user.avatar = avatarName;
        yield user.save();
        return res.json({ avatar: user.avatar });
    }
    catch (e) {
        res.status(500).json({ message: 'Uploaded avatar error', error: e });
    }
}));
router.delete('/avatar/:id', cors(app_1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        yield fs.unlink(avatarConfig.get('staticPath') + '\\' + user.avatar, (err) => {
            if (err)
                throw err;
            console.log('File deleted');
        });
        user.avatar = null;
        yield user.save();
        return res.json({ avatar: user.avatar });
    }
    catch (e) {
        res.status(500).json({ message: 'Delete avatar error', error: e });
    }
}));
router.get('/avatar/:id', cors(app_1.corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        if (user.avatar) {
            res.sendFile(avatarConfig.get('staticPath') + '\\' + user.avatar);
        }
        else {
            console.log('Avatar not found');
        }
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again', error: e });
    }
}));
module.exports = router;
//# sourceMappingURL=avatar.routes.js.map