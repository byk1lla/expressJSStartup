const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation{
    constructor(){}

    static register = async (req,res,next) =>{
        try {
            await joi.object({
                name: joi.string().trim().min(3).max(100).required().messages({
                    "string.base":"İsim Alanı Metin olmalıdır!",
                    "string.empty":"İsim Alanı Boş Olmamalıdır!",
                    "string.min":"İsim Alanı Minimum 3 Karakterli Olmalıdır!",
                    "string.max":"İsim Alanı Maksimum 100 Karakter olabilir!",
                    "string.required":"İsim Alanı Zorunludur!"
                }),
                lastname: joi.string().trim().min(3).max(100).required().messages({
                    "string.base":"Soyisim Alanı Metin olmalıdır!",
                    "string.empty":"Soyisim Alanı Boş Olmamalıdır!",
                    "string.min":"Soyisim Alanı Minimum 3 Karakterli Olmalıdır!",
                    "string.max":"Soyisim Alanı Maksimum 100 Karakter olabilir!",
                    "string.required":"Soyisim Alanı Zorunludur!"
                }),
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base":"E-Posta Alanı Metin olmalıdır!",
                    "string.empty":"E-Posta Alanı Boş Olmamalıdır!",
                    "string.min":"E-Posta Alanı Minimum 3 Karakterli Olmalıdır!",
                    "string.email":"Lütfen Geçerli bir E-Posta Adresi Giriniz!",
                    "string.max":"E-Posta Alanı Maksimum 100 Karakter olabilir!",
                    "string.required":"E-Posta Alanı Zorunludur!"
                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base":"Şifre Alanı Metin olmalıdır!",
                    "string.empty":"Şifre Alanı Boş Olmamalıdır!",
                    "string.min":"Şifre Alanı Minimum 6 Karakterli Olmalıdır!",
                    "string.max":"Şifre Alanı Maksimum 36 Karakter olabilir!",
                    "string.required":"Şifre Alanı Zorunludur!"
                })
            }).validateAsync(req.body)

        } catch (error) {
            if(error?.details[0] && error?.details[0].message){
                throw new APIError(error?.details[0].message,400)
            }else throw new APIError("Lütfen İçeriği Doğru bir şekilde gönderiniz.",400)
        }
        next()
    }

    static login = async(req,res,next) =>{
        try {
            await joi.object({
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base":"E-Posta Alanı Metin olmalıdır!",
                    "string.empty":"E-Posta Alanı Boş Olmamalıdır!",
                    "string.min":"E-Posta Alanı Minimum 3 Karakterli Olmalıdır!",
                    "string.email":"Lütfen Geçerli bir E-Posta Adresi Giriniz!",
                    "string.max":"E-Posta Alanı Maksimum 100 Karakter olabilir!",
                    "string.required":"E-Posta Alanı Zorunludur!"
                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base":"Şifre Alanı Metin olmalıdır!",
                    "string.empty":"Şifre Alanı Boş Olmamalıdır!",
                    "string.min":"Şifre Alanı Minimum 6 Karakterli Olmalıdır!",
                    "string.max":"Şifre Alanı Maksimum 36 Karakter olabilir!",
                    "string.required":"Şifre Alanı Zorunludur!"
                })
            }).validateAsync(req.body)
        } catch (error) {
            if(error?.details[0] && error?.details[0].message){
                throw new APIError(error?.details[0].message,400)
            }else throw new APIError("Lütfen İçeriği Doğru bir şekilde gönderiniz.",400)
        }
    }
}


module.exports = authValidation