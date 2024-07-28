const jwt = require("jsonwebtoken");
const APIError = require("../../utils/errors");
const user = require("../../models/user.model");

const createToken = async (user, res) => {
  const payload = {
    sub: user._id,
    name: user.name,
  };

  const token = await jwt.sign(payload, process.env.TOKEN_JWT, {
    algorithm: "HS512",
    expiresIn: process.env.EXPIRE_JWT,
  });
  res.status(201).json({
    success: true,
    token,
    message: "Giriş Başarılı!",
  });



};

const checkToken = async (req,res,next) => {
    const headerToken = req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
    if(!headerToken){
        throw new APIError("Lütfen Oturum Açın!",401);
    }

    const token = req.headers.authorization.split(" ")[1];
    await jwt.verify(token,process.env.TOKEN_JWT, async(err,decoded) => {
        if(err){
            throw new APIError("Geçersiz Token!",401);
        }
        const userInfo = await user.findById(decoded.sub).select("_id name lastname email")
        if(!userInfo){
            throw new APIError("Geçersiz Token - Kullanıcı Bulunamadı!",401);
        }
        req.user = userInfo;
        next();
    });

};

module.exports = {
  createToken,
  checkToken,
};
