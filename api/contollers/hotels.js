import hotels from "../models/hotels.js"
import router from "../routes/hotels.js"
import rooms from "../models/rooms.js"

export const CreateHotel = async(req,res,next)=>{

    const newHotel = new hotels(req.body)

    try{
      const saveHotel = await newHotel.save()
      res.status(200).json(saveHotel)
    }catch(err){
        next(err)
    }
}


export const UpdateHotel = async (req,res,next) =>{

    try{
      const updatedHotel = await hotels.findByIdAndUpdate(req.params.id, { $set: req.body })
      res.status(200).json(updatedHotel)
    }catch(err){
        next(err)
    }
}

export const GetHotel = async (req,res,next) =>{
    
    try{
      const Hotel = await hotels.findById(
        req.params.id
        );
      res.status(200).json(Hotel)
    }catch(err){
        next(err)
    }
}

export const GetHotels = async (req,res,next) =>{
    
    try{
      const hotelss = await hotels.find()
      res.status(200).json(hotelss)
    }catch(err){
        next(err)
    }
}


export const DeleteHotel = async (req,res,next) =>{

    try{
      await hotels.findByIdAndDelete(
        req.params.id
    )
      res.status(200).json("Hotel Has been deleted")
    }catch(err){
        next(err)
    }
}


export const countByCity = async (req,res,next)=>{
  const cities = req.query.cities.split(",")
  try{
    const list = await Promise.all(cities.map(city=>{
      return hotels.countDocuments({city:city})
    }))

    res.status(200).json(list);
  }catch(err){
    next(err)
  }
}


export const countByType = async (req,res,next)=>{
  try{
  const hotelCount = await hotels.countDocuments({type:"hotel"});
  const apartmentCount = await hotels.countDocuments({type:"apartment"});
  const resortCount = await hotels.countDocuments({type:"resort"});
  const villaCount = await hotels.countDocuments({type:"villa"});
  const cabinCount = await hotels.countDocuments({type:"cabin"});

  

    res.status(200).json([
      { type:"hotel",count:hotelCount },
      { type:"apartment",count:apartmentCount },
      { type:"resorts",count:resortCount} ,
      { type:"villas",count:villaCount },
      { type:"cabins ",count:cabinCount }
     
    ]);
  }catch(err){
    next(err)
  }
}


export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await hotels.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
     
        return rooms.findById(room);
        
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};


