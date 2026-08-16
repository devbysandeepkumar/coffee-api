import { request, response } from "express";
import { findCoffee } from "../service/ai.service";

export const getCoffeeDetails = async (req: typeof request, res: typeof response): Promise<void> => {
  const { name } = req.query;

  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Coffee name must be a single string" });
    return;
  }

  try {
    const coffeeDetails = await findCoffee(name);
    if (coffeeDetails) {
      res.status(200).json(coffeeDetails);
    } else {
      res.status(404).json({ error: "Coffee not found" });
    }
  } catch (error) {
    console.error("Error fetching coffee details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
