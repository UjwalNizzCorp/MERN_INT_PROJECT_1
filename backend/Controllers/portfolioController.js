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
    const portfolio = await createPortfolio(req.taskbody);
    res.status(201).json(portfolio);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {Promise<object>} - The project object.
 * @function addProject - Adds a project to a portfolio.
 *
 */
export const addProject = async (req, res, next) => {
  /**
   * @property {string} projectId - recieve the id of the project .
   */

  const { addProject } = new PortfolioServices();
  const projectId = req.body.projectId;
  try {
    const project = await addProject(req.params.id, projectId);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
//  * @returns {Promise<object>} - The project object.
 * @function deleteProject - Deletes a project from a portfolio.
 */

export const deleteProject = async (req, res, next) => {
  /**
   * @property {string} projectId - The ID of the project.
   * @function deleteProject - call the removeProject method in PortfolioServices.js.
   */

  const { removeProject } = new PortfolioServices();
  const projectId = req.body.projectId;
  try {
    const deltedProject = await removeProject(req.params.id, projectId);
    res.status(204).send(deltedProject);
  } catch (error) {
    next(error);
  }
};
