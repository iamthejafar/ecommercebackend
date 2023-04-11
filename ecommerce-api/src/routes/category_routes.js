const router = require('express').Router();

const CategoryModel = require('./../models/category_model');


router.post('/',async function(req,res){

    const categoryData = req.body;

    const newCategory = new CategoryModel(categoryData);
    await newCategory.save(res.json({success:true,data:newCategory})).then(console.log('New Category Saved'));
});

router.get('/',async function(req,res){
    const allCategories = await CategoryModel.find();
    if(!allCategories){
        res.json({success:false,error:'No categories available'});
        return ;
    }
    res.json({success:true,data:allCategories});
    
});


router.delete('/', async function(req,res){
    const categoryid = req.body.categoryid;
    const result = await CategoryModel.findOneAndDelete({categoryid:categoryid});

    if(!result){
        res.json({success:false,error:'category-not-found'});
        return ;
    }

    res.json({success:true,data:result});
});


router.put('/',async function(req,res){
    const categoryData = req.body;
    const categoryid = categoryData.categoryid;

    const result = await CategoryModel.findOneAndUpdate({categoryid:categoryid},categoryData);

    if(!result){
        res.json({success:false, error:"category-not-found"});
        return ;
    }

    res.json({success:true,data:result});
});
module.exports = router;