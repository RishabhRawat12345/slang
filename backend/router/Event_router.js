const express=require("express");

const router=express.Router();
const {getEvent,geteventbyid,createEvent} = require("../Controller/Event_Controller");


router.get("/getdata",getEvent);

router.get("/getbyid/:id",geteventbyid);

router.post("/create",createEvent);

module.exports=router;