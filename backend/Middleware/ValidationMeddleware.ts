import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../Controllers/validateSchema.js";
import { Request, Response, NextFunction } from "express";

/**
 * @brief Middleware to validate register request body.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 *  @param {function} next - The next middleware function.
 * @returns {void}
 */
export const registserValidateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    req.taskbody = { ...req.body };
  }
  next();
};

export const loginVlaidateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    req.taskbody = { ...req.body };
  }
  next();
};
