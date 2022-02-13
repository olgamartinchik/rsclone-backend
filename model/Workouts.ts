const mongooseW = require('mongoose');

const SchemaW = mongooseW.Schema;

const schemaW = new SchemaW({
    title: String,
    description: String,
    equipment: String,
    type: String,
    intensity: String,
    duration: Number,
    caloriesPerMinute: Number,
    link: String,
    img: String,
    completed: Boolean,
});

module.exports = mongooseW.model('Workouts', schemaW);
