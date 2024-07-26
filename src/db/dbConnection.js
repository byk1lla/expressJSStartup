const mongoose = require("mongoose");


mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>  {
    console.log("VeriTabanına Bağlanıldı!")

})
.catch((err) => console.log("Veritabanı hatası: ",err));

