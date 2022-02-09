const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(require('morgan')('dev'));

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ extended: true }));

//initialize routs
app.use('/api/auth', require('../routes/auth.routes'));
app.use('/api/userSettings', require('../routes/userSettings.routs'));
app.use('/api/workouts', require('../routes/workouts.routs'));
app.use('/api/workoutSettings', require('../routes/workoutSettings.routs'));

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