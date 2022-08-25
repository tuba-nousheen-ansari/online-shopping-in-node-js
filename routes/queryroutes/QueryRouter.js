const express= require("express");
const router=express.Router();

const queryController=require("../../controller/querycontroller/QueryController.js");

router.get("/",queryController.querypage);
router.post("/query",queryController.querypost);
router.post("/customerquery",queryController.queryPost1)


module.exports =router;