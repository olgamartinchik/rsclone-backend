const mongooseUM = require('mongoose');
const SchemaUM = mongooseUM.Schema;
const schemaUM = new SchemaUM({
    _id: String,
    periodUserMeal: Object,
});
module.exports = mongooseUM.model('UserMenu', schemaUM);
//# sourceMappingURL=UserMenu.js.map