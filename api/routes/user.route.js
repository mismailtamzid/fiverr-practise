import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/jwt.js"


const router = express.Router();

router.get("/test", (req,res)=>{
    res.send("it works!");
})

router.delete("/:id",verifyToken, deleteUser);
router.get("/:id",verifyToken, getUser);

export default router;