const mongoose2 = require('mongoose');
const UserSettingsSchema = mongoose2.Schema;



const schema2= new UserSettingsSchema({
    userId:String,
    startDate:String,
    goal:String,    
    weight: String,   
    height: String,
    age: String,
    gender:String, 
    desiredWeight: String,    
    duration: String,   
    workoutsNumber:String,    
    workoutLength:Object,    
    favWorkouts: Array
})

module.exports = mongoose2.model("UserSettings", schema2);

