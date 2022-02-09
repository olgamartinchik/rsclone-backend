const mongooseWS = require('mongoose');
const SchemaWS = mongooseWS.Schema;

const schemaWS = new SchemaWS({
    _id: String,
    program:Array=Array
});
module.exports = mongooseWS.model('WorkoutSettings', schemaWS);
