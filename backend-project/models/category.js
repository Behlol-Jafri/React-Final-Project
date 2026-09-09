const { default: mongoose, SchemaTypes } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    "Name": {
        type: SchemaTypes.String,
        require: true
    },
    "Image": {
        type: SchemaTypes.String,
        require:true
    }
})

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;