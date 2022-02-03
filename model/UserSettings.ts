const mongooseUS = require('mongoose');
const SchemaUS = mongooseUS.Schema;

const schemaUS = new SchemaUS({
    userId: String,
    startDate: String,
    goal: String,
    weight: Number,
    height: Number,
    age: Number,
    gender: String,
    desiredWeight: Number,
    duration: Number,
    workoutsNumber: Number,
    workoutLength: Object,
    favWorkouts: Array,
});

module.exports = mongooseUS.model('UserSettings', schemaUS);
