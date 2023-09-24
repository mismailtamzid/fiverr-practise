import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js";


export const createGig= async(req,res, next)=>{
    if(!req.body.isSeller) return next(createError(403,"Only seller can create a gig."));
const newGig= new Gig({
    userId:req.body.userId,
    ...req.body,
});

try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
} catch (err) {
    next(err);
}
};

export const deleteGig= async(req,res, next)=>{
    try {
        const gig= await Gig.findById(req.params.id);
        console.log("Gig.useriD= ", Gig.userId);
        console.log("req.useriD= ", req.userId);
        if(gig.userId !== req.userId)
        return res.status(403).send("You can delete only your gig");
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted.");
    } catch (err) {
        res.send(err.message);
    }
}

export const getGig= async(req,res, next)=>{
    console.log("hitted gig")
    try{
        const gig=await Gig.findById(req.params.id);
        if(!gig) next(createError(404,"gig not found."));
        res.status(200).send(gig);
    } catch(err){
        res.send(err.message);
    }
}

export const getGigs=async(req,res,next)=>{
    const q=req.query;
    const filters={
        ...(q.userId && {userId:q.userId}),
        ...(q.cat && {cat:q.cat}),
        ...(q.min || q.max) && {
            price:{
                ...(q.min && {$gt:q.min}),
                ...(q.max && {$lt:q.max}),
                ...Gig(q.search && {title:{$regex:q.search, $options:"i"}}),
            }
        }
    }
    try{
        const gigs = await Gig.find(filters).sort({[q.sort]:-1});
        res.status(200).send(gigs);
    } catch(err){
        res.send(err.message);
    }
}

