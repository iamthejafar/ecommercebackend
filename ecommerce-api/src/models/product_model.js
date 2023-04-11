const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    productid : {type: String, unique:true, required:true},
    title : {type: String, required : true},
    description : {type: String},
    category:{type: Schema.Types.ObjectId, ref:"Category"},
    styles : {type: [{type:Schema.Types.ObjectId, ref:"ProductStyle"}], default: []},
    createdat : {type:Date,default:Date.now}
});


const productModel = model("Product",productSchema);

module.exports = productModel;
