const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');

const app = express();
// const authMiddleware = require('../middleware/auth.middleware')

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

export const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.get('/', (req: any, res: any) => {
    res.send('Hello, World!');
});

app.use(require('morgan')('dev'));
app.use(cors(corsOptions));

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

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(process.env.PORT || 5000, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
