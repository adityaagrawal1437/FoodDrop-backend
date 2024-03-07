import express from "express";
import multer from "multer";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantOrders,
  updateOrderStatus,
  updateRestaurant,
} from "../Controllers/RestaurantController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyRestaurantRequest } from "../middlewares/validation";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/order", jwtCheck, jwtParse, getRestaurantOrders);

router.patch("/order/:orderId/status", jwtCheck, jwtParse, updateOrderStatus);

router.get("/", jwtCheck, jwtParse, getRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  createRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  updateRestaurant
);

export default router;
