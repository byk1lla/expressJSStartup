require("express-async-errors");
const errorHandlerMiddleWare = require ("./src/middlewares/errorHandler");
const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnection");
const port = process.env.PORT || 5585;

app.use(express.json());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true, parameterLimit:50000}));

app.get("/",(req,res) => {
    res.json( { message: "Yeni Bir ExpressJS projesi Doğmuş, Merhaba!" } );
    
})
// Middlewares


const router = require("./src/routers");
app.use("/api",router);
// Error Handler
app.use(errorHandlerMiddleWare);

app.listen(port,() => {
console.log(`Sunucu ${port} portunda çalışıyor.`);
});