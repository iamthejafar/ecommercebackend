const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads");
    },
    filename: function(req,file,cb){
        const ogname = file.originalname;
        const nameArray = ogname.split('.');

        const extension = nameArray[nameArray.length-1];

        const newname = uuid.v1() + '.' + extension;
        cb(null,newname);
    }
});

const upload = multer({
    storage:storage
});

module.exports = upload;
