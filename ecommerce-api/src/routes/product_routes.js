const router = require('express').Router();
const ProductModel = require('../models/product_model');
const ProductStyleModel = require('../models/producr_style_model');

router.post('/',async function(req,res){

    const productData = req.body;

    const styleids = [];
    productData.styles.forEach(async function(style){
        const newStyle = ProductStyleModel(style);
        styleids.push(newStyle._id);
        await newStyle.save();
    });

    productData.styles = styleids;


    const newProduct = new ProductModel(productData);

    await newProduct.save(res.json({success:true,data:newProduct})).then(console.log('Product Data stored'));

});

router.delete('/',async function(req,res){
    const productid = req.body.productid;

    const result = await ProductModel.findOneAndDelete({productid:productid});

    if(!result){
        res.json({success:false, error:"No-Product-found."});
        return ;
    }
    res.json({success:true,data:result});

});


router.get('/',async function(req,res){
    const allProducts = await ProductModel.find().populate('category styles');
    if(!allProducts){
        res.json({success:false,error:"No Product Available"});
        return ;
    }
    res.json({success:true, data:allProducts});
});

router.put('/',async function(req,res){
    const productData = req.body;
    const productid = productData.productid;

    const result = await ProductModel.findOneAndUpdate({productid:productid},productData);

    if(!result){
        res.json({success:false, error:"product-not-found"});
        return ;
    }

    res.json({success:true,data:result});
});

module.exports = router;