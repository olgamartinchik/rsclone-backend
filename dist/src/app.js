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
exports.corsOptions = void 0;
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
exports.corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use(require('morgan')('dev'));
app.use(cors(exports.corsOptions));
app.use(fileupload());
app.use(express.json({ extended: true }));
app.use(express.static('../static/'));
app.use('/api', require('../routes/avatar.routes'));
app.use('/api/menu', require('../routes/userMenu.routes'));
app.use('/api/editProfile', require('../routes/editProfile.routes'));
app.use('/api/auth', require('../routes/auth.routes'));
app.use('/api/userSettings', require('../routes/userSettings.routes'));
app.use('/api/workouts', require('../routes/workouts.routes'));
app.use('/api/workoutSettings', require('../routes/workoutSettings.routes'));
const PORT = process.env.PORT || config.get('port');
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(config.get('mongoUri'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            app.listen(process.env.PORT || 5000, () => console.log(`App has been started on port ${PORT}...`));
        }
        catch (e) {
            console.log('Server Error', e.message);
            process.exit(1);
        }
    });
}
start();
//# sourceMappingURL=app.js.map