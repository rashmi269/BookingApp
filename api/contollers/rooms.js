import rooms from "../models/rooms.js";
import hotels from "../models/hotels.js";

import { createError } from "../utils/error.js";

export const createRoom =  async (req,res,next) =>{
    const hotelId = req.params.hotelid;
    const newRoom = new rooms(req.body)

    try{
       const savedRoom = await newRoom.save()
       try{
         await hotels.findByIdAndUpdate(hotelId,{
            $push: { rooms: savedRoom._id },
         });
       }catch(err){
           next(err);
       }

       res.status(200).json(savedRoom);
    }catch(err){
       b=next(err) 
    }
}



export const UpdateRoom = async (req,res,next) =>{

    try{
      const updatedRoom = await rooms.findByIdAndUpdate(req.params.id, { $set: req.body })
      res.status(200).json(updatedRoom)
    }catch(err){
        next(err)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await rooms.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const GetRoom = async (req,res,next) =>{
    
    try{
      const Room = await rooms.findById(
        req.params.id
        );
      res.status(200).json(room)
    }catch(err){
        next(err)
    }
}

export const GetRooms = async (req,res,next) =>{
    
    try{
      const Rooms = await rooms.find()
      res.status(200).json(Rooms)
    }catch(err){
        next(err)
    }
}


export const DeleteRoom = async (req,res,next) =>{
    const hotelid = req.params.hotelId;
    try{
      await rooms.findByIdAndDelete(req.params.id) 

         try{
              await hotels.findByIdAndDelete(hotelid,{
              $pull: { rooms: req.params.id },
           });
          }catch(err){
            next(err);
          }


      res.status(200).json("Room Has been deleted")
    }catch(err){
        next(err)
    }
}

