const mongoose1 = require('mongoose');

const Schema1 = mongoose1.Schema;

const schema1=new Schema1({
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