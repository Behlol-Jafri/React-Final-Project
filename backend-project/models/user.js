const { default: mongoose, SchemaTypes } = require("mongoose");

const UserSchema = new mongoose.Schema({
    "Name":{
        type : SchemaTypes.String,
        require:true
    },
    "Email":{
        type : SchemaTypes.String,
        require:true
    },
    "Password":{
        type : SchemaTypes.String,
        require:true
    },
    "DateOfBirth":{
        type : SchemaTypes.Date,
        require:true
    },
    "Contact":{
        type : SchemaTypes.Array,
        require:true
    },
    "Image":{
        type : SchemaTypes.String,
        require:true
    }
})

const User = mongoose.model("User",UserSchema);
module.exports= User;