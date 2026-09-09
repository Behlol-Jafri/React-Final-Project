const { default: mongoose, SchemaTypes } = require("mongoose");

const TypeSchema = new mongoose.Schema({
    "Name":{
        type : SchemaTypes.String,
        require:true
    }
})

const Type = mongoose.model("Type",TypeSchema);
module.exports = Type;