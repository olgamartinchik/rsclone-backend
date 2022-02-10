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
    favWorkouts: Array,
    caloriesBurned: {type:Number, default:0},
    badges: Array,
    heightUnit:{type:String, default:''},
    weightUnit:{type:String, default:''},
    completedWorkouts:{type:Number, default:0},
    weekProgress:{currentWeek: Number, calories: Number, workoutsNumber: Number, workoutsCompleted: Number, minutes:Number },
    liked:Array

});

module.exports = mongooseUS.model('UserSettings', schemaUS);
