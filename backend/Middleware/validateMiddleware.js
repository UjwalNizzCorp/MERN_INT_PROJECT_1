import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../Controllers/validateSchema.js";

export const registserValidateMiddleware = (req, res, next) => {
  const { error } = validateRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    req.taskbody = { ...req.body };
  }
  next();
};

export const loginVlaidateMiddleware = (req, res, next) => {
  const { error } = validateLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    req.taskbody = { ...req.body };
  }
  next();
};

// // export const createPortfolioValidMWare = (req,res,next) => {
// //   const { error } =
// //   if (error) {
// //     return res.status(400).send(error.details[0].message);
// //   } else {
// //     req.taskbody = { ...req.body };
// //   }
// //   next();
// }
