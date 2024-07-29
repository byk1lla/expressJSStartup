const router = require("express").Router();
const multer = require("multer");
const upload = require("../middlewares/lib/upload")
const auth = require("./auth.routes");
const APIError = require("../utils/errors");
const Response = require("../utils/response");



router.use(auth);

router.post("/upload",(req,res) => {
    upload(req,res, (err) => {
        if(err instanceof multer.MulterError)
            throw new APIError("Resim Yüklenirken Servis Kaynaklı Bir Hata Oluştu: ", err)
        else if(err)
            throw new APIError("Resim Yüklenirken Bir Hata Oluştu: ",err)
        else
            return new Response(req.savedImages,"Yükleme Başarılı!",).success(res)
    })
})


module.exports = router