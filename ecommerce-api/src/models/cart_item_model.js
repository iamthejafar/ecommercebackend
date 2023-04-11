const {Schema, model} = require("mongoose");
const uuid = require('uuid');
const cartItemSchema = new Schema({
    cartid:{type:String, required:true},
    cartitemid : {type: String, default:uuid.v1()},
    product: {type:Schema.Types.ObjectId, ref:"Product"},
    style:{type:Schema.Types.ObjectId, ref:"ProductStyle"},
    createdat : {type:Date,default:Date.now},
    quantity: {type:Number, default:1}
});


const cartItemModel = model("cart",cartItemSchema);

module.exports = cartItemModel;
