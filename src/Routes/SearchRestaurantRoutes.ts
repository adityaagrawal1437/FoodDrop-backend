import express from "express";
import { param } from "express-validator";
import Restaurant from "../Models/RestaurantModel";
import { searchRestaurants } from "../Controllers/SearchRestaurantController";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  searchRestaurants
);

export default router;
