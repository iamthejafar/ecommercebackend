const router = require('express').Router();
const upload = require('./../middlewares/file_upload');

router.post('/single', upload.single('image'),async function(req,res){
    const uploadedfile = req.file;
    if(!uploadedfile){
        res.json({success:false, error:'file-not-uploaded'});
        return ;
    }
    res.json({success:true,data:'http://localhost:5000/'+uploadedfile.filename});
});


router.post('/multiple',upload.array('images',10), async function(req,res){
    const uploadedfiles = req.files;

    if(!uploadedfiles || uploadedfiles.length == 0){
        res.json({success:false, error:"files-not-uploaded"});
        return ;
    }

    var arrayUrls= [];
    uploadedfiles.forEach(function(file){
        arrayUrls.push('http://localhost:5000/'+ file.filename);
    });

    res.json({success:true,data:arrayUrls});
})
module.exports = router;