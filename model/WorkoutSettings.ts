const mongooseWS = require('mongoose');
const SchemaWS = mongooseWS.Schema;

const schemaWS = new SchemaWS({
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
    _id: String,
});
module.exports = mongooseWS.model('WorkoutSettings', schemaWS);
