const {Schema, model} = require('mongoose');
const uuid = require('uuid');
const cartSchema = new Schema({
    cartid : {type: String, default:uuid.v1()},
    userid : {type: String, unique:true, required:true},
    items: {type:[{type:Schema.Types.ObjectId, ref:"CartItem"}]},
    createdat : {type:Date,default:Date.now}
})

const cardModel = model('CartModel',cartSchema);

module.exports = cardModel;