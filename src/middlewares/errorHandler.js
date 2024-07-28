const APIError = require("../utils/errors");

const errorHandlerMiddleWare = (err,req,res,next) => {
    if(err instanceof APIError){
        return res.status(err.statusCode || 400)
            .json({
                success:false,
                message:err.message
            })
    }
    return res.status(500)
        .json({
            success:false,
            message:"Sanırım Bir Karışıklık Oluştu?!🤔 Lütfen API'yi Kontrol edin!",
            error:err
        });
}

module.exports = errorHandlerMiddleWare