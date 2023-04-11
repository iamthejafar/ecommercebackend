const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('uploads'));


//Enter Your Mongo Db Atlas ID
mongoose.connect("mongodb+srv://jafarjalali128:Jafar123@cluster0.5uepdjv.mongodb.net/?retryWrites=true&w=majority").then(
    function(){
        app.get("/", function(req,res){
            res.send('Ecommerce Setup');
        });

        app.get("/check",function(req,res){
            console.log('works');
            res.send('just check');
        });
        const userRoutes = require('./routes/user_routes');
        app.use("/api/user/",userRoutes);

        const productRoutes = require('./routes/product_routes');
        app.use('/api/product/',productRoutes);

        const categoryRoutes = require('./routes/category_routes');
        app.use('/api/category/',categoryRoutes);

        const fileRoutes = require('./routes/file_routes');
        app.use('/api/file/',fileRoutes);

     
    }
).catch((err)=>console.log(err));

const PORT = 5000;


app.listen(PORT,function(){
    console.log(`Sever Started at PORT : ${PORT}`)
});