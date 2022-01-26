const mongoose2 = require('mongoose');
const UserSettingsSchema = mongoose2.Schema;



const schema2= new UserSettingsSchema({
    userId:String,
    goal:String,    
    weight: String,   
    height: String,
    age: String,
    gender:String, 
    desiredWeight: String,    
    duration: String,   
    workoutsNumber:String,    
    workoutLength:Object,
    // {
    //     min:String,
    //     max:String},
     favWorkouts: Array
    //  {
    //     dance:String,
    //     boxing:String,
    //     meditation:String,
    //     strength:String,
    //     cardio:String,
    //     HIIT:String,
    //     pilates:String,
    //     stretch:String,
    //     yoga:String,
    // },

})

module.exports = mongoose2.model("UserSettings", schema2);

