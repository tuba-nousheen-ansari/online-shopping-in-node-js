const express= require("express");
const router=express.Router();
const auth=require("../../authentication/CustomerAuth");

const customerController=require("../../controller/customercontroller/CustomerController.js");

router.get("/",customerController.loginpage);
router.post("/login",customerController.loginpost);

router.get("/addcart/:pro_id",auth.isAuth,customerController.addCartPage);
router.get("/alladdcart",auth.isAuth,customerController.allCartPage)


module.exports =router;