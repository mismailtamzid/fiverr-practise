import express from "express";
import {verifyToken} from "../middleware/jwt.js"
import {
  createGig,
  deleteGig,
  getGig,
  getGigs
} from "../controllers/gig.controller.js";


const router = express.Router();

router.post("/",verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

router.get("/test", (req, res)=>{
 console.log("hitting")
});




export default router;