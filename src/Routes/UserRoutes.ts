import express from "express";
import { createUser, getCurrentUser, updateUser } from "../Controllers/UserController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";
const router = express.Router();

router.get('/',jwtCheck,jwtParse,getCurrentUser);
router.post("/", jwtCheck, createUser);
router.put("/",jwtCheck,jwtParse,validateMyUserRequest,updateUser);

export default router;
