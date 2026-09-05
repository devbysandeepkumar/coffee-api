import express from "express";
import { getCoffeeDetails } from "../controller/search.controller.js";
const router = express.Router();

router.get("/search", getCoffeeDetails);

export default router;
