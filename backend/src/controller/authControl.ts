import { Request, Response, NextFunction } from "express";
import { UserServices } from "../service/userService.js";

console.log("Type of UserServices: ", typeof UserServices);

const userService = new UserServices();
/**
 * documentation needed
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const userService = new UserService();
  try {
    // const { name, email, password } = req.reg_user;
    const { name, email, password } = req.body;
    const user = await userService.registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const userService = new UserService();
  try {
    // const { password, email } = req.log_user;
    const { password, email } = req.body;
    const user = await userService.logingUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const userService = new UserService();
  try {
    const userId = req.params.id;
    const user = await userService.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    // console.log("The Eroor is : ", error.statusCode, error.message, error);
    next(error);
  }
};
