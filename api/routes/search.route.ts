import express from "express";
import dotenv from "dotenv";
import { getCoffeeDetails } from "../controller/search.controller";
const router = express.Router();
dotenv.config();

router.get("/search", getCoffeeDetails);

export default router;
