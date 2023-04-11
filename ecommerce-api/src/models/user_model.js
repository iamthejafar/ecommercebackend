const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    userid:{type: String},
    fullname: {type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String},

    address:{type:String},
    city:{type:String},
    country:{type:String},
    pincode:{type:String},

    createdat:{type:Date,default:Date.now}

});


const userModel = model("User",userSchema);

module.exports = userModel;
