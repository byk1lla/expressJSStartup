const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const rootDir = path.dirname(require.main.filename);
        fs.mkdirSync(path.join(rootDir,"/public/uploads"),{
            recursive:true
        });
        cb(null,path.join(rootDir,"/public/uploads"))
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];

        if(!req.savedImages){
            req.savedImages = [];
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let url = `ìmage_${uniqueSuffix}.${extension}`

        req.savedImages = [...req.savedImages, path.join(url)];
        cb(null, url)
    }
});

const fileFilter = (req,file,cb) => {
    const allowedMimeTypes = ["image/gif","image/png","image/jpeg","image/jpg"];

    if(!allowedMimeTypes.includes(file.mimetype)){
        cb(new Error("Bu Dosya Türü Desteklenmemektedir Lütfen Bir Resim Yükleyiniz."), false);
    }

    cb(null,true);
}


const upload = multer({
    storage,fileFilter
}).array("images",10)


module.exports = upload;