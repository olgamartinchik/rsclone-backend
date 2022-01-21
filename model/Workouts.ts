const mongoose1 = require('mongoose');

const Schema1 = mongoose1.Schema;
// const { Schema1, model1, Types1 } = require("mongoose");

const schema1=new Schema1({
    // title:{ type: String, required: true },
    // description:{ type: String, required: true },
    // equipment:{ type: String, required: true },
    // type:{ type: String, required: true },
    // intensity:{ type: String, required: true },
    // duration:{ type: Number, required: true },
    // caloriesPerMinute:{ type: Number, required: true },
    // link:{ type: String, required: true },
    // img:{ type: String, required: true }
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