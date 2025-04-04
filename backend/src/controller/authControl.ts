import UserService from "../service/userService.js";
import { Request, Response, NextFunction } from "express";

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
  const { registerUser } = new UserService();
  try {
    // const { name, email, password } = req.reg_user;
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
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
  const { logingUser } = new UserService();
  try {
    // const { password, email } = req.log_user;
    const { password, email } = req.body;
    const user = await logingUser(email, password);
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
  const { getUser } = new UserService();
  try {
    const userId = req.params.id;
    const user = await getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    // console.log("The Eroor is : ", error.statusCode, error.message, error);
    next(error);
  }
};
