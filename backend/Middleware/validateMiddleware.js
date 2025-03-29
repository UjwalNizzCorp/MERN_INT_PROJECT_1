import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../Controllers/validateSchema.js";

/**
 * @breef Middleware to validate register request body.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
export const registserValidateMiddleware = (req, res, next) => {
  const { error } = validateRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    req.taskbody = { ...req.body };
  }
  next();
};

/**
 * @breef Middleware to validate login request body.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
export const loginVlaidateMiddleware = (req, res, next) => {
  const { error } = validateLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    req.taskbody = { ...req.body };
  }
  next();
};
