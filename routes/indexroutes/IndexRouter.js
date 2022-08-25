const express= require("express");
const router=express.Router();

const customerController=require("../../controller/indexcontroller/IndexController.js");

router.get("/",customerController.homepage);

router.get("/register",customerController.registerPage);
router.post("/register",customerController.registerPost);


router.get("/contact",customerController.contactpage);
router.get("/category",customerController.categorypage);
router.get("/about",customerController.aboutpage);

router.get("/viewall",customerController.viewAllPage);

router.get("/shopnow/:id",customerController.shopNowPage);

module.exports =router;