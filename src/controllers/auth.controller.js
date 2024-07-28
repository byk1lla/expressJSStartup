const bcrypt = require("bcrypt");
const user = require("../models/user.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/validations/auth");

const login = async (req, res) => {
  const { email, password } = req.body;

  const userCheck = await user.findOne({ email });
  if (!userCheck) {
    throw new APIError("Lütfen Bilgilerinizi Kontrol edin!", 401);
  }
  const comparePassword = await bcrypt.compare(password, userCheck.password);

  if (!comparePassword) {
    throw new APIError("Lütfen Bilgilerinizi Kontrol edin!", 401);
  }

  createToken(userCheck,res);

  // return res.json({
  //   data: req.body,
  //   message: "Giriş Başarılı!",
  // });
};
const register = async (req, res) => {
  const { email } = req.body;

  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new APIError(
      "Email Başka bir kullanıcı tarafından Kullanılıyor!",
      401
    );
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const userSave = new user(req.body);

  await userSave
    .save()
    .then((data) => {
      return new Response(data, "Kullanıcı Başarıyla Oluştu!").created(res);
    })
    .catch((err) => {
      console.log(err);
      throw new APIError("Kullanıcı Kaydedilemedi!", 400);
    });

  // return  res.json(req.body);
};

const me = async(req,res) => {
    return new Response(req.user).success(res)
}

module.exports = {
  login,
  register,
  me
};
