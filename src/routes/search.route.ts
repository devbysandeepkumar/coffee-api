import express from "express";
import { getCoffeeDetails } from "../controller/search.controller";
const router = express.Router();

router.get("/search", getCoffeeDetails);

export default router;
