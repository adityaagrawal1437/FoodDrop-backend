import { Request, Response, NextFunction } from "express";
import User from "../Models/UserModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email } = req.body;
    const user = await User.findOne({ auth0Id });
    if (user) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Error creating user!",
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user!" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: "Error getting User!" });
  }
};
