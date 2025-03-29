import PortfolioServices from "../service/portfolioServices.js";

/**
 * @author Jaseem
 * @breef This class provides methods for managing user portfolios.
 */

/**
 * @breef Retrieves a portfolio by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<object>} - The portfolio object.
 * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
 */
export const getPortfolioController = async (req, res, next) => {
  const { getPortfolioById } = new PortfolioServices();
  try {
    const id = req.params.id;
    const portfolio = await getPortfolioById(id);
    res.status(200).json(portfolio);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @breef Retrieves all portfolios.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<object>} - The portfolio object.
 * @throws {ErrorMessage} - Throws an error if the portfolio is not found or the ID is invalid.
 */
export const createPortfolioController = async (req, res, next) => {
  const { createPortfolio } = new PortfolioServices();
  try {
    const project = await createPortfolio(req.taskbody);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
