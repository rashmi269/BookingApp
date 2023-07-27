import users from "../models/users.js"
import router from "../routes/users.js"

export const Createusers = async(req,res)=>{

    const newusers = new users(req.body)

    try{
      const saveusers = await newusers.save()
      res.status(200).json(saveusers)
    }catch(err){
        next(err)
    }
}


export const Updateusers = async (req,res,next) =>{

    try{
      const updatedusers = await users.findByIdAndUpdate(req.params.id, { $set: req.body })
      res.status(200).json(updatedusers)
    }catch(err){
        next(err)
    }
}

export const Getuser = async (req,res,next) =>{
    
    try{
      const users = await users.findById(
        req.params.id
        );
      res.status(200).json(users)
    }catch(err){
        next(err)
    }
}

export const Getusers = async (req,res,next) =>{
    
    try{
      const userss = await users.find()
      res.status(200).json(userss)
    }catch(err){
        next(err)
    }
}


export const Deleteusers = async (req,res,next) =>{

    try{
      await users.findByIdAndDelete(
        req.params.id
    )
      res.status(200).json("users Has been deleted")
    }catch(err){
        next(err)
    }
}

