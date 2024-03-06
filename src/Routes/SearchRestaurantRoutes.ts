import express from "express";
import { param } from "express-validator";
import Restaurant from "../Models/RestaurantModel";
import { getRestaurantDetail, searchRestaurants } from "../Controllers/SearchRestaurantController";

const router = express.Router();

router.get("/:restaurantId", param("restaurantId")
.isString()
.trim()
.notEmpty()
.withMessage("RestaurantId parameter must be a valid string"),getRestaurantDetail)

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
