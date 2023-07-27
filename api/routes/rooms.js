import express from "express";
import { createRoom, DeleteRoom, GetRoom, GetRooms, UpdateRoom , updateRoomAvailability, } from "../contollers/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//Create
router.post("/:hotelid",verifyAdmin, createRoom);
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id",verifyAdmin ,UpdateRoom);
//GET
router.get("/:id",GetRoom);
//GET ALL
router.get("/",GetRooms);
//DELETE
router.delete("/:id/:hotelid",verifyAdmin,DeleteRoom)


export default router;