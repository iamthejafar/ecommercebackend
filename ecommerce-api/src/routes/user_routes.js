const router = require('express').Router();

const UserModel = require('./../models/user_model');

const bcrypt = require('bcrypt');
const CartModel = require('./../models/cart_model');
const CartItemModel = require('./../models/cart_item_model');

const uuid = require('uuid');
const { populate } = require('../models/product_model');

router.get('/random', function(req,res){
    res.send('routing is happening');
});


router.post("/createaccount", async function(req,res){
    const userData = req.body;

    const password = userData.password;
    const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,10);

    userData.password = hashedPassword;

    const newUser = new UserModel(userData);
    await newUser.save(res.json({success:true,data:newUser})).then(
        console.log('New User')
    );
});


router.post("/login",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const founduser = await UserModel.findOne({email:email});
    if(!founduser){
        res.json({success:false, error : 'user-not-found'});
        return ;
    }
    res.json({success:true,data:founduser});
});


router.get("/:userid", async function(req,res){
    const userid = req.params.userid;
 
    const founduser = await UserModel.findOne({userid:userid});
    if(!founduser){
        res.json({success:false, error:"No user found"});
        return ;
    }
    res.json({success:true, data:founduser});

});


router.put('/updateaccount',async function(req,res){
    const userData = req.body;
    const userid = userData.userid;

    const result = await UserModel.findOneAndUpdate({userid:userid},userData);

    if(!result){
        res.json({success:false, error:"user-not-found"});
        return ;
    }

    res.json({success:true,data:result});
});


router.post("/:userid/addtocart", async function(req,res){
    console.log('routed here.');
    const userid = req.params.userid;
    const cartItemDetails = req.body;

    const userCart = await CartModel.findOne({userid:userid});

    if(!userCart){
        const newCartModel = new CartModel({userid:userid,items:[]});
        await newCartModel.save();
        cartItemDetails.cartid = newCartModel.cartid;
    }else{
        cartItemDetails.cartid = userCart.cartid;
    }

    const newCartItem = new CartItemModel(cartItemDetails);
    await newCartItem.save(res.json({success:true, data:newCartItem}));


});
router.get("/:userid/viewcart", async function(req,res){
    const userid = req.params.userid;
 
    const foundcart = await CartModel.findOne({userid:userid}).populate({
        path : "items",
        populate:{
            path:"product"
        }
    });
    if(!foundcart){
        res.json({success:false, error:"No cart found"});
        return ;
    }
    res.json({success:true, data:foundcart});

});
module.exports = router;
