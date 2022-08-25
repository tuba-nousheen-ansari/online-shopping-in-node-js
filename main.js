//basic packages
const express= require("express");
const app = express();
const bodyParser=require("body-parser");
const path = require("path");
var session = require('express-session')


//routes package
const adminRouter=require("./routes/adminroutes/AdminRouter.js");
const indexRouter=require("./routes/indexroutes/IndexRouter.js");
const categoryRouter=require("./routes/categoryroutes/CategoryRouter.js");
const productRouter=require("./routes/productroutes/ProductRouter.js");
const queryRouter=require("./routes/queryroutes/QueryRouter.js");
const customerRouter=require("./routes/customerroutes/CustomerRouter.js");

//bodyParser and static file and ejs tetmplate engine
app.use(bodyParser.urlencoded({ extended:true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
    secret: 'geekhardware'
  }))

//adminroutes and userroutes
app.use("/customer",customerRouter);
app.use("/query",queryRouter);
app.use("/category",categoryRouter);
app.use("/product",productRouter);
app.use("/",indexRouter);
app.use("/admin",adminRouter);


app.listen(3000,()=>{
    console.log("Server Start At Port : "+3000);
});

