import express from "express";
import { CreateHotel, DeleteHotel, GetHotel, GetHotels, UpdateHotel, countByCity ,countByType, getHotelRooms} from "../contollers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//Create
router.post("/",verifyAdmin, CreateHotel);
//UPDATE
router.put("/:id",verifyAdmin ,UpdateHotel);
//GET
router.get("/find/:id",GetHotel);
//GET ALL
router.get("/",GetHotels);
//DELETE
router.delete("/:id",verifyAdmin,DeleteHotel);

router.get("/countByCity",countByCity);
router.get("/countByType",countByType);
router.get("/room/:id",getHotelRooms);


export default router;