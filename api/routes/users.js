import express from "express";
import {
    Updateusers,
    Createusers,
    Deleteusers,
    Getuser,
    Getusers
} from "../contollers/users.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello User!! You are logged in")
// })


// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("Hello User,you are logged in and ypu can delete your account")
// })

// router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello Admin,you are logged in and ypu can delete any account")
// })


//Create
router.post("/", verifyUser,Createusers);
//UPDATE
router.put("/:id", verifyUser,Updateusers);
//GET
router.get("/:id",verifyUser, Getuser);
//GET ALL
router.get("/",verifyAdmin, Getusers);
//DELETE
router.delete("/:id", verifyAdmin, Deleteusers)


export default router;