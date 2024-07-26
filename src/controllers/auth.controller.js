const bcrypt = require("bcrypt");
const user = require("../models/user.model");
const APIError = require("../utils/errors");


const login = async (req,res) =>{
    console.log(req.body);

    return  res.json(req.body);
}
const register = async (req,res) =>{
    const {email} = req.body;

    const userCheck = await user.findOne({email});

    if(userCheck){
        throw new APIError("Email Başka bir kullanıcı tarafından Kullanılıyor!",401)
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    try{
        const userSave = new user(req.body);

        await userSave.save()
        .then((response) => {
            console.log(response);
            return res.status(201).json({
                success:true,
                data:response,
                message:"Kullanıcı Oluşturuldu!"
            });
        })
        .catch((err) => {console.log(err)});
    }catch(error){
        console.log(error);
    }


    // return  res.json(req.body);

}


module.exports= {
    login,
    register
}