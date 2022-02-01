const mongoose1 = require('mongoose');
const workoutsSchema=mongoose1.Schema


const schema1=new workoutsSchema({
    title:String,
    description: String,
    equipment:String,
    type:String,
    intensity:String,
    duration:Number,
    caloriesPerMinute:Number,
    link:String,
    img:String
})

module.exports = mongoose1.model("Workouts", schema1);