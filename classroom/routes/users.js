const express= require("express");
const router=express.Router();

//INDEX-users
router.get("/",(req,res)=>{
    res.send("GET for show user");
})

//SHOW-users
router.get("/:id",(req,res)=>{
    res.send("GET for user id");
})

//POST-users
router.post("/",(req,res)=>{
    res.send("POST for show user");
})

//DELETE-users
router.delete("/:id",(req,res)=>{
    res.send("DELETE for user id");
})

module.exports=router;