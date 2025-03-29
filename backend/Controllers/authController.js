import UserService from "../service/UserServices.js";
import ErrorMessage from "../util/errorMessage.js";

/**
 * documentation needed
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const registerController = async (req, res, next) => {
  const { registerUser } = new UserService();
  try {
    const { name, email, password } = req.taskbody;
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { logingUser } = new UserService();
  try {
    const { password, email } = req.taskbody;
    const user = await logingUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
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
